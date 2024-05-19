<template>
   <div class="fancy_quote mb-6 w-full rounded-lg  overflow-hidden dark:bg-gray-900/35 bg-gray-100">
      <div class="px-4 pt-4 pb-4">
         <p class="text-left leading-relaxed">
            <ContentSlot name="sentence" unwrap="p" />
         </p>
         <p class="text-right leading-relaxed">
            <ContentSlot name="cite" unwrap="p" />
         </p>
      </div>
      <!-- <div v-if="$slots.footer" class="bg-gray-100 pt-2 px-4 pb-2">
         <ContentSlot name="footer" />
      </div> -->
   </div>
</template>

<script setup lang='ts'>
interface FancyQuoteProps {
}
const props = withDefaults(defineProps<FancyQuoteProps>(), {
})
onMounted(() => {
})

</script>

<style scoped lang="scss">
.fancy_quote {
   font-family: 'Barlow' sans-serif;
}

</style>