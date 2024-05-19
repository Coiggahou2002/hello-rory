<template>
   <Clickable :text="text" :href="href">
      <template #icon>
         <component :is="`svgo-${icon}`" class="w-5 h-5" filled :font-controlled="false" />
      </template>
   </Clickable>
</template>

<script setup lang='ts'>
interface TechStackTagProps {
   text: string;
   href?: string;
   icon: string;
}
const props = withDefaults(defineProps<TechStackTagProps>(), {
   text: 'unknown',
   icon: ''
})

</script>

<style scoped lang="scss"></style>