<template>
   <BaseTip type="error">
      <template #title>
         <ContentSlot :use="$slots.title" unwrap="p" />
      </template>
      <ContentSlot :use="$slots.default" unwrap="p" />
   </BaseTip>


</template>

<script setup lang='ts'>
interface ErrorProps {
}
const props = withDefaults(defineProps<ErrorProps>(), {
})
onMounted(() => {
})

</script>

<style scoped lang="scss"></style>