<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
   return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
   <div>
      <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)"
         class="hover:bg-200 p-2 rounded">
         {{ locale.name }}
      </NuxtLink>
   </div>
</template>