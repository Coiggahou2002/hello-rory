<template>
   <h1 class="font-semibold text-3xl my-4 text-gray-800 dark:text-white" :id="id">
      <a v-if="generate" :href="`#${id}`">
         <slot />
      </a>
      <slot v-else />
   </h1>
</template>
 
<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h1)
</script>