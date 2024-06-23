<template>
   <div
      class="group cursor-pointer p-4 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/65 rounded-lg relative overflow-hidden hover:border-gray-500 dark:hover:border-gray-400 transition-all">
      <div class="relative z-10" @click="gotoRefLink">
         <div class="w-5/6 font-semibold mb-2 dark:text-gray-200 truncate">
            <ContentSlot :use="$slots.title" unwrap="p" />
         </div>
         <div class="text-gray-500 dark:text-gray-400 text-sm leading-normal">
            <ContentSlot :use="$slots.description" unwrap="p" />
         </div>
      </div>
      <SvgoPaperclip
         v-if="props.type === ReferenceCardType.NormalLink"
         class="group-hover:scale-150 absolute right-0 top-0 h-24 w-24 z-0 opacity-25 text-gray-300 dark:text-gray-900 transition-all"
         :font-controlled="false" />
      <SvgoGithub
         v-if="props.type === ReferenceCardType.GitHub"
         class="group-hover:scale-150 absolute right-0 top-0 h-24 w-24 z-0 opacity-25 text-gray-300 dark:text-gray-900 transition-all"
         :font-controlled="false" />

   </div>
</template>

<script setup lang='ts'>
enum ReferenceCardType {
   GitHub = 'github',
   NormalLink = 'normal',
}
interface ReferenceCardProps {
   link: string;
   type: ReferenceCardType.GitHub
   | ReferenceCardType.NormalLink;
}
const props = withDefaults(defineProps<ReferenceCardProps>(), {
   link: '',
   type: ReferenceCardType.NormalLink,
})

const gotoRefLink = () => {
   window.open(props.link, '_blank');
}

</script>

<style scoped lang="scss"></style>