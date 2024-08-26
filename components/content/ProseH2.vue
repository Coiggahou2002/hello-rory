<template>
  <h2 class="group font-semibold text-2xl mt-8 mb-4 text-gray-700 dark:text-white flex items-center" :id="id">
    <!-- <div class="mr-2 opacity-50 absolute -left-12">##</div> -->
    <div class="ml-2 text-xl absolute -left-10 opacity-15 group-hover:opacity-25">H2</div>
    <a v-if="id && generate" :href="`#${id}`" class="inline-block">
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h2)
</script>