<template>
  <div class="w-full flex-col flex">
    <ContentList path="/blogs" v-slot="{ list }">
      <div v-for="article in list" :key="article._path">
        <BlogLink :blog="article"/>
      </div>
    </ContentList>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
</style>