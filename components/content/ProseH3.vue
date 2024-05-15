<template>
   <h3 class="font-semibold text-xl mt-8 mb-4 text-gray-700 dark:text-white" :id="id">
      <span class="mr-2 opacity-50">###</span>
      <a v-if="id && generate" :href="`#${id}`">
         <slot />
      </a>
      <slot v-else />
   </h3>
</template>
 
<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h2)
</script>