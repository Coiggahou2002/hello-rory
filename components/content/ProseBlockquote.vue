<template>
  <blockquote
    class="prose_blockquote bg-gray-200/50 dark:bg-gray-900/75 rounded-lg pt-2 pb-3  px-4 border-l-8 border-gray-200 dark:border-gray-950 font-normal my-4 ">
    <div class="text-gray-500 mb-0 leading-relaxed italic">
      <ContentSlot  :use="$slots.default" unwrap="p"/>
    </div>
  </blockquote>
</template>
<style lang="scss">
</style>