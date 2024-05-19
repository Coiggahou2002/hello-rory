<template>
   <NuxtLink
     :href="href"
     :target="target"
     class="underline underline-offset-4 decoration-gray-400/25 hover:decoration-gray-400 dark:decoration-gray-500/75 dark:hover:decoration-gray-500"
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