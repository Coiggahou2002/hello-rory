<script setup lang='ts'>
import confetti from 'canvas-confetti';
const { $anime } = useNuxtApp()
const { locale } = useI18n();

const handleNameClick = (e: MouseEvent) => {
   confetti({
      // particleCount: 100,
      // spread: 70,
      origin: {
         x: e.clientX / window.innerWidth,
         y: e.clientY / window.innerHeight,
      }
   });
}
onMounted(() => {
})

</script>

<template>
   <h1 class="text-title font-bold  mt-12 mb-8 select-none cursor-pointer" :style="{
   }" @click="handleNameClick">Rory Cai</h1>
   <span class="selfintro_text pb-6 font-normal">{{ $t('hello') }}, {{ $t('iam') }} Rory Cai, {{
      $t('a_fullstack_developer') }}
      <span>.</span>
   </span>
   <div class="selfintro_text font-normal">
      <span>{{ capitalize($t('graduated_from')) }}</span>
      <Clickable :text="$t('hit')" href="https://www.hitsz.edu.cn/">
         <template #icon>
            <img src="@/assets/images/hit.png" class="w-5 h-5 dark:invert dark:grayscale" />
         </template>
      </Clickable>
      <span>.</span>
   </div>
   <div class="selfintro_text font-normal">
      <template v-if="locale === 'zh'">
         <span>目前任职</span>
         <ProfileTechStackTag text="腾讯" href="https://www.tencent.com/zh-cn/" icon="ten" />
         <span>前端开发工程师</span>
      </template>
      <template v-if="locale === 'en'">
         <span>Currently working at</span>
         <ProfileTechStackTag text="Tencent" href="https://www.tencent.com/en-us" icon="ten" />
         <span>as a frontend developer.</span>
      </template>
   </div>
   <div class="selfintro_text font-normal">
      <span>Fans of</span>
      <ProfileTechStackTag text="Nuxt" href="https://nuxt.com" icon="nuxt" />
      <ProfileTechStackTag text="Vite" href="https://vitejs.dev" icon="vite" />
      <span>.</span>
   </div>
</template>



<style scoped lang="scss">
.selfintro_text {
   @apply text-lg text-gray-600 dark:text-gray-300 my-2 leading-8;
}

.text-title {
   @apply text-4xl text-gray-800 dark:text-white;
}
</style>