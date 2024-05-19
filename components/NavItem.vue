<template>
   <NuxtLink class="nav_item mr-6" :class="[size === 'bigger' ? 'bigger' : '']" :to="localePath(nav.to)">
      {{ $t(nav.text).toUpperCase() }}
   </NuxtLink>
</template>

<script setup lang='ts'>
import type { Navigations } from '~/types/profile';
const localePath = useLocalePath();

interface NavItemProps {
   nav: Navigations.NavItem;
   size: 'normal' | 'bigger';
}
const props = withDefaults(defineProps<NavItemProps>(), {
   nav: {
      text: 'unknown',
      to: '/'
   },
   size: 'normal',
})

</script>

<style scoped lang="scss">
.nav_item {
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

   &.bigger {
      @apply text-2xl;
   }
}
</style>