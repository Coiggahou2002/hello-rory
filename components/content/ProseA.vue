<template>
   <NuxtLink
     :href="href"
     :target="target"
     class="underline underline-offset-4 decoration-gray-500/25 hover:decoration-gray-500 dark:decoration-gray-500/75 dark:hover:decoration-gray-500 text-gray-700"
   >
     <slot />
   </NuxtLink>
 </template>
 
 <script setup lang="ts">
 import type { PropType } from 'vue'
 
 defineProps({
   href: {
     type: String,
     default: ''
   },
   target: {
     type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
     default: undefined,
     required: false
   }
 })
 </script>