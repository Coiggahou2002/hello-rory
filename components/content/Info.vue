<template>
   <BaseTip type="info">
      <template #title>
         <ContentSlot :use="$slots.title" unwrap="p" />
      </template>
      <ContentSlot :use="$slots.default" unwrap="p" />
   </BaseTip>


</template>

<script setup lang='ts'>
interface InfoProps {
}
const props = withDefaults(defineProps<InfoProps>(), {
})
onMounted(() => {
})

</script>

<style scoped lang="scss"></style>