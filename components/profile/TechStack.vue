<template>
   <div key="tech_title" class="text-lg text-gray-600 dark:text-gray-300 my-2 leading-8 pt-10 font-semibold">{{ $t('overview_of_techstacks') }}:
   </div>
   <ul>
      <li class="tech_item" v-for="tech in TECH_STACK_CONF" :key="tech.title">
         <span class="tech_item_prefix">#</span>
         <strong class="tech_item_key">{{ capitalize(tech.title) }}</strong>:
         <ProfileTechStackTag v-for="tag in tech.tags" :text="tag.text" :icon="tag.icon" />
      </li>
   </ul>
</template>

<script setup lang='ts'>
import type { Profile } from "@/types/profile";
const { t } = useI18n();

const TECH_STACK_CONF: Profile.TechStackConfig = [
   {
      title: t('web'),
      tags: [
         { text: 'TypeScript', icon: 'typescript' },
         { text: 'Nuxt', icon: 'nuxt' },
         { text: 'Vue', icon: 'vue' },
         { text: 'Tailwind', icon: 'tailwind' }
      ]
   },
   {
      title: t('mobile'),
      tags: [
         { text: 'React Native', icon: 'react' },
         { text: 'Kotlin', icon: 'kotlin' },
         { text: 'Objective-C', icon: 'ios' },
      ]
   },
   {
      title: t('backend'),
      tags: [
         { text: 'Golang', icon: 'golang' },
         { text: 'Node.js', icon: 'nodejs' }
      ]
   },
   {
      title: t('scripting'),
      tags: [
         { text: 'Python', icon: 'python' }
      ]
   },
   {
      title: t('database'),
      tags: [
         { text: 'MongoDB', icon: 'mongodb' }
      ]
   },
   {
      title: t('cloud_native'),
      tags: [
         { text: 'Docker', icon: 'docker' },
         { text: 'Kubernetes', icon: 'kubernetes' },
         { text: 'Prometheus', icon: 'prometheus' },
         { text: 'Grafana', icon: 'grafana' }
      ]
   }
]

const { $anime } = useNuxtApp()
onMounted(() => {
   $anime({
      targets: '.tech_item',
      opacity: [0, 1],
      translateX: [-100, 0],
      delay: $anime.stagger(100) // increase delay by 100ms for each elements.
   });
})

</script>

<style scoped lang="scss">
.tech_item {
   @apply my-2 leading-loose;

   &_key {
      @apply font-normal text-gray-600 dark:text-gray-400;
   }

   &_prefix {
      @apply font-normal text-gray-300 dark:text-gray-600 mr-1;
   }
}

</style>