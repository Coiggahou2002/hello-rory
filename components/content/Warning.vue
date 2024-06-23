<template>
   <BaseTip type="warning">
      <template #title>
         <ContentSlot :use="$slots.title" unwrap="p" />
      </template>
      <ContentSlot :use="$slots.default" unwrap="p" />
   </BaseTip>
</template>

<script setup lang='ts'>
interface WarningProps {
}
const props = withDefaults(defineProps<WarningProps>(), {
})
onMounted(() => {
})

</script>

<style scoped lang="scss"></style>