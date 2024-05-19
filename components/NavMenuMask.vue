<template>
   <Transition>
      <div class="menu_mask fixed inset-0 right-0 backdrop-blur-2xl bg-white/50 dark:bg-gray-900/50 z-50" v-show="model">
         <div class="absolute right-6 top-6">
            <SvgoClose class="h-6 w-6 text-gray-300 dark:text-gray-600" :font-controlled="false" @click="closeMenuMask" />
         </div>
         <ul class="p-12">
            <li class="my-8" v-for="n in navs">
               <NavItem :nav="n" @click="closeMenuMask" size="bigger"/>
            </li>
         </ul>
      </div>
   </Transition>
</template>

<script setup lang='ts'>
import type { Navigations } from '~/types/profile';

interface NavMenuMaskProps {
   navs: Navigations.NavItem[];
}
const props = withDefaults(defineProps<NavMenuMaskProps>(), {
   navs: [],
});

const model = defineModel({ type: Boolean })

const openMenuMask = () => {
   model.value = true;
}
const closeMenuMask = () => {
   model.value = false;
}
const selectMenuMask = () => {
   closeMenuMask();
}
onMounted(() => {
})

</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
   transition: all 0.4s ease;
}

.v-enter-to,
.v-leave-from {
   transform: translateX(0);
}

.v-enter-from,
.v-leave-to {
   opacity: 0;
   transform: translateX(-100%);
}
</style>