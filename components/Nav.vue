<template>
   <nav class="select-none w-full max-w-screen-md px-8 lg:px-0">
      <ul class="flex justify-between items-center gap-1 pb-4 pt-12">
         <ClientOnly>
            <template v-if="screenSize === EScreenSizeType.PHONE">
               <li class="" @click="openMenuMask">
                  <SvgoMenu class="h-6 w-6 text-gray-300 dark:text-gray-600 " :font-controlled="false" />
               </li>
               <NavMenuMask :navs="NAVS" v-model="showMenuMask" />
            </template>
            <template v-else>
               <NavItem v-for="n in NAVS" :nav="n" />
            </template>
         </ClientOnly>
         <span class="grow shrink-0"></span>
         <LangSwitch class="mr-1 text-gray-300 dark:text-gray-600" />
         <ColorModeSwitch :mode="colorMode.preference" class="mr-1" />
         <li class="hidden lg:block">
            <div class="search_btn flex items-center justify-start" @click="dispatchOpenModal" ref="SearchBtnRef">
               <SvgoSearch id="nav_search_icon" class="h-4 w-4 mr-2" filled :font-controlled="false" />
               <span>{{ $t('search') }}</span>
               <SvgoCommand class="h-4 w-4 ml-2 " filled :font-controlled="false" />
               <span>K</span>
            </div>
         </li>
      </ul>
   </nav>
</template>

<script lang="ts" setup>
import type { Navigations } from '~/types/profile';
const { openModal } = useGlobalSearchModal();
const colorMode = useColorMode()
const localePath = useLocalePath();
const { screenSize } = useScreenSize();
const { t } = useI18n();

const showMenuMask = ref(false);
const openMenuMask = () => {
   showMenuMask.value = true;
}


const NAVS: Navigations.NavItem[] = [
   { text: 'me', to: '/' },
   { text: 'blogs', to: '/blogs' },
   { text: 'uses', to: '/menu/uses' },
   { text: 'journal', to: '/menu/journal' },
];


const SearchBtnRef = ref<HTMLLIElement | null>(null);
const { $anime } = useNuxtApp();
const dispatchOpenModal = () => {
   // SearchBtnRef.value?.classList.add('zoomed-and-centered');
   const [
      originTop,
      originLeft,
   ] = [SearchBtnRef.value?.offsetTop, SearchBtnRef.value?.offsetLeft];
   if (!SearchBtnRef.value) return;
   const newNode = SearchBtnRef.value.cloneNode(true) as HTMLDivElement;
   newNode.style.position = 'fixed';
   newNode.style.top = `${originTop}px`;
   newNode.style.left = `${originLeft}px`;
   document.body.appendChild(newNode);
   const [width, height] = [window.innerWidth / 2, SearchBtnRef.value.offsetHeight * 2]
   const elTop = window.innerHeight * 0.2;
   const elLeft = window.innerWidth / 2 - width / 2;
   let openModalExecuted = false;
   $anime({
      targets: newNode,
      width: width,
      height: height,
      top: elTop,
      left: elLeft,
      easing: 'easeOutQuad',
      duration: 200,
      update: (anim) => {
         if (openModalExecuted) return;
         const { progress } = anim;
         if (progress > 59) {
            openModal();
            openModalExecuted = true;
         }
      }
   }).finished.then(() => {
      // remove the anim el
      newNode.remove();
   })
}

</script>

<style lang="scss" scoped>
.search_btn {
   @apply w-32 cursor-pointer py-2 px-2 bg-gray-100/75 dark:bg-gray-900/50 rounded-lg text-sm text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/75;

   span {
      @apply text-gray-400;
   }
}
</style>