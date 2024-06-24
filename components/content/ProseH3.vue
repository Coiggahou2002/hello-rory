<template>
   <h3 class="group font-semibold text-xl mt-8 mb-4 text-gray-700 dark:text-white relative" :id="id">
      <!-- <span class="mr-2 opacity-50">###</span> -->
      <div class="ml-2 text-lg absolute -left-9 opacity-0 group-hover:opacity-15">H3</div>
      <a v-if="id && generate" :href="`#${id}`" class="inline-block">
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