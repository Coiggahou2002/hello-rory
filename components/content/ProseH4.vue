<template>
  <h3 class="group font-semibold text-lg mt-8 mb-4 text-gray-700 dark:text-white relative" :id="id">
     <div class="ml-2 absolute -left-9  opacity-0 group-hover:opacity-15">H4</div>
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