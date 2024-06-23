<template>
   <pre :class="$props.class" class="rounded-lg my-4 bg-gray-200/50 dark:bg-gray-900 px-4 py-2 text-sm overflow-auto"><slot /></pre>
</template>
 
<script setup lang="ts">
defineProps({
   code: {
      type: String,
      default: ''
   },
   language: {
      type: String,
      default: null
   },
   filename: {
      type: String,
      default: null
   },
   highlights: {
      type: Array as () => number[],
      default: () => []
   },
   meta: {
      type: String,
      default: null
   },
   class: {
      type: String,
      default: null
   }
})
</script>
 
<style>
pre code .line {
   display: block;
}
</style>