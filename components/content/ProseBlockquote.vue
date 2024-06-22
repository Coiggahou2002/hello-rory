<template>
  <blockquote
    class="prose_blockquote bg-gray-100 dark:bg-gray-900/75 rounded pt-2 pb-2  px-4 border-l-8 border-gray-200 dark:border-gray-950 font-normal my-2 ">
    <slot class="text-gray-300 mb-0" />
  </blockquote>
</template>
<style lang="scss">
.prose_blockquote {
  p {
    margin-bottom: 0 !important;
  }
}
</style>