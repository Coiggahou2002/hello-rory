<template>
   <nav class="select-none w-full max-w-screen-md px-8 lg:px-0">
      <ul class="flex justify-between items-center gap-1 pb-4 pt-12">
         <li class="mr-6" v-for="n in NAVS" :key="n.text">
            <NuxtLink class="nav_item" :to="localePath(n.to)">
            {{ $t(n.text).toUpperCase() }}
            </NuxtLink>
         </li>
         <span class="grow shrink-0"></span>
         <LangSwitch class="mr-1 text-gray-300 dark:text-gray-600" />
         <ColorModeSwitch :mode="colorMode.preference" class="mr-1" />
         <li class="invisible lg:visible">
            <div class="search_btn flex items-center justify-start" @click="dispatchOpenModal" ref="SearchBtnRef">
               <SvgoSearch id="nav_search_icon" class="h-4 w-4 mr-2" filled :font-controlled="false" />
               <span>{{ $t('search') }}</span>
               <SvgoCommand class="h-4 w-4 ml-2 " filled  :font-controlled="false" />
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
const { t } = useI18n();

const NAVS: Navigations.NavItem[] = [
   { text: 'me', to: '/' },
   { text: 'blogs', to: '/blogs' },
   { text: 'uses', to: '/uses' },
   { text: 'journal', to: '/journal' },
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
   @apply w-32 cursor-pointer py-2 px-2 bg-gray-100/75 dark:bg-gray-900/50 rounded-lg text-sm text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/75 ;

   span {
      @apply text-gray-400;
   }
}

.nav_item {
   //   border-b-2 border-b-transparent hover:border-gray-400
   // font-family: 'Fira Sans Condensed' !important;
   // font-family: 'Barlow' !important;
   // font-family: 'Barlow' !important;
   font-family: 'Barlow Semi Condensed' !important;

   @apply text-xl text-gray-300 hover:text-gray-800 transition-all dark:text-gray-600 dark:hover:text-gray-300 py-2 my-1 tracking-normal;
   // decoration-gray-200 dark:decoration-gray-700;

   position: relative;

   &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: -1;
      bottom: 8px;
      left: 3px;
      right: 3px;
      height: 12px;
      @apply bg-gray-200 dark:bg-gray-600;
      transition: width 0.3s;
      opacity: 0;
   }

   &.router-link-exact-active {
      //  @apply text-gray-800 dark:text-gray-300;
      @apply text-gray-800 dark:text-gray-300 font-semibold;

      //  underline underline-offset-1 decoration-8 ;
      &::after {
         opacity: 1;
      }
   }
}
</style>