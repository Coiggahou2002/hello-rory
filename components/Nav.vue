<template>
   <nav class="select-none">
      <ul class="flex justify-center items-center gap-1 pb-4 pt-12">
         <li>
            <NuxtLink class="nav_item" to="/">
               Me
            </NuxtLink>
         </li>
         <li>
            <NuxtLink class="nav_item" to="/blogs">
               Blogs
            </NuxtLink>
         </li>
         <li>
            <a class="nav_item cursor-pointer" @click="openModal">
               <SearchIcon id="nav_search_icon" class="h-5 w-5 mr-2" filled :font-controlled="false"
                  @mouseenter="handleMouseOverSearchIcon" @mouseleave="handleMouseOutSearchIcon" />
            </a>
         </li>
      </ul>
   </nav>
</template>

<script lang="ts" setup>
import SearchIcon from "@/assets/icons/search.svg";
import type { NavItem } from '@nuxt/content/types';
const { openModal } = useGlobalSearchModal();

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
   @apply text-xl text-gray-300 hover:text-gray-800 transition-all dark:text-gray-600 dark:hover:text-gray-300 py-2 my-1 mx-2;
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
      @apply bg-gray-200;
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