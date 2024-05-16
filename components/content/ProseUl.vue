<template>
   <ul class="prose_ul">
      <slot />
   </ul>
</template>

<style lang="scss" scoped>
.prose_ul {
   @apply font-light text-gray-700 my-1 list-disc list-inside;
}
</style>