<template>
   <BaseTip type="success">
      <template #title>
         <ContentSlot :use="$slots.title" unwrap="p" />
      </template>
      <ContentSlot :use="$slots.default" unwrap="p" />
   </BaseTip>


</template>

<script setup lang='ts'>
interface SuccessProps {
}
const props = withDefaults(defineProps<SuccessProps>(), {
})
onMounted(() => {
})

</script>

<style scoped lang="scss"></style>