<template>
   <div :class="['tip', containerClass]">
      <div class="tip_title  ">
         <slot name="title">
            {{ defaultTitle.toUpperCase() }}
         </slot>

      </div>
      <div class="tip_content ">
         <slot />

      </div>
   </div>

</template>

<script setup lang='ts'>
enum TipType {
   Info = 'info',
   Warning = 'warning',
   Error = 'error',
   Success = 'success',
}

interface Tip {
   type: TipType;
   title: string;
}

const props = withDefaults(defineProps<Tip>(), {
   type: TipType.Info,
   title: '',
})

const defaultTitle = computed(() => {
   if (props.title) {
      return props.title
   }
   switch (props.type) {
      case TipType.Info:
         return 'Info'
      case TipType.Warning:
         return 'Warning'
      case TipType.Error:
         return 'Error'
      case TipType.Success:
         return 'Success'
   }
})

const containerClass = computed(() => {
   return {
      'info': props.type === TipType.Info,
      'warning': props.type === TipType.Warning,
      'error': props.type === TipType.Error,
      'success': props.type === TipType.Success,
   }
})
onMounted(() => {

})

</script>

<style scoped lang="scss">
.tip {
   @apply rounded-lg pt-3 pb-3 px-4 font-normal my-4;

   &.info {
      @apply bg-blue-100/50 dark:bg-blue-700/25 border-blue-400 border;

      .tip_title {
         @apply text-blue-500 dark:text-blue-300;
      }
   }

   &.warning {
      @apply bg-amber-100/50 dark:bg-amber-700/25 border-amber-400 border;

      .tip_title {
         @apply text-amber-500 dark:text-amber-300;
      }
   }

   &.error {
      @apply bg-red-100/50 dark:bg-red-700/25 border-red-400 border;


      .tip_title {
         @apply text-red-500 dark:text-red-300;
      }
   }

   &.success {
      @apply bg-emerald-100/50 dark:bg-emerald-700/25 border-emerald-400 border;

      .tip_title {
         @apply text-emerald-500 dark:text-emerald-300;
      }
   }


   &_title {
      @apply font-semibold leading-relaxed mb-1;
   }

   &_content {
      @apply mb-0 leading-relaxed text-gray-500 dark:text-gray-300;

   }
}
</style>