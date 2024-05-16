<template>
   <nav class="select-none">
      <ul class="flex justify-center items-center gap-1 pb-4 pt-12">
         <li v-for="link of originNavs" :key="link._path">
            <NuxtLink class="nav_item" :to="link._path">
               {{ link.title }}
            </NuxtLink>
         </li>
         <NuxtLink class="nav_item" to="/blogs">
            Blogs
         </NuxtLink>
         <a class="nav_item cursor-pointer" @click="openModal">
            <SearchIcon id="nav_search_icon" class="h-5 w-5 mr-2" filled :font-controlled="false"
               @mouseenter="handleMouseOverSearchIcon" @mouseleave="handleMouseOutSearchIcon" />
         </a>
      </ul>
   </nav>
</template>

<script lang="ts" setup>
import SearchIcon from "@/assets/icons/search.svg";
import type { NavItem } from '@nuxt/content/types';
const { openModal } = useGlobalSearchModal();

const navSelectorQuery = {
   where: [
      // / No
      // /xxxx Yes
      // /xxx/xxx No
      { _path: /^\/\w+$/ },
   ],
}

const originNavs: NavItem[] = await fetchContentNavigation()

const { $anime } = useNuxtApp()
const handleMouseOverSearchIcon = () => {
   $anime({
      targets: '#nav_search_icon',
      scale: 1.4,
      easing: 'spring(1, 80, 10, 20)'
   })

}
const handleMouseOutSearchIcon = () => {
   $anime({
      targets: '#nav_search_icon',
      scale: 1,
      easing: 'spring(1, 80, 10, 1)'
   })
}
</script>

<style lang="scss" scoped>
.nav_item {
   //   border-b-2 border-b-transparent hover:border-gray-400
   font-family: 'Fira Sans Condensed' !important;
   @apply text-xl text-gray-300 hover:text-gray-800 transition-all dark:text-gray-600 dark:hover:text-gray-300 py-2 my-1 mx-2 decoration-gray-200 dark:decoration-gray-700;

   &.router-link-exact-active {
      //  @apply text-gray-800 dark:text-gray-300;
      @apply text-gray-800 dark:text-gray-300 underline underline-offset-1 decoration-8 font-semibold;
   }
}
</style>