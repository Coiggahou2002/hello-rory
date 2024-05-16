<template>
   <div class="clickable" @click="gotoHref">
      <div class="flex justify-start items-center">
         <span :class="slots.icon ? 'mr-1' : ''">
            <slot name="icon"></slot>
         </span>
         <span class="clickable_text" :style="{
            color: props.color
         }" :class="{
            'font-semibold': !!props.bold,
            'italic': !!props.italic
         }">{{ props.text }}</span>
      </div>
   </div>
</template>

<script lang="ts" setup>
interface ClickableProps {
   href?: string;
   text: string;
   // icon?: string;
   color?: string;
   bold?: boolean;
   italic?: boolean;
}
const props = withDefaults(defineProps<ClickableProps>(), {
   bold: false,
   italic: false,
   href: '',
});
const slots = useSlots();

const gotoHref = () => {
   if (props.href) {
      window.open(`${new URL(props.href)}`, '_blank')
   }
}

</script>

<style lang="scss" scoped>
.clickable {
   @apply 
   rounded px-1 py-0 mx-1 cursor-pointer inline-block align-middle
   opacity-80
   bg-gray-200/50 hover:bg-gray-200/95
   dark:bg-gray-100/15 dark:hover:bg-gray-100/25
   ;

   &_text {
      @apply 
      text-gray-600 text-base hover:text-gray-800 
      dark:text-gray-300 dark:hover:text-gray-100;
   }
}
</style>