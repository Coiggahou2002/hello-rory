<template>
   <ol class="prose_ol ">
      <slot />
   </ol>
</template>

<style lang="scss" scoped>
.prose_ol {
   @apply list-inside list-decimal mb-6;
}
</style> 