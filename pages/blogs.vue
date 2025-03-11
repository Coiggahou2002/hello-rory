<template>
  <div>
    <div class="w-full flex-col flex">
      <ContentList path="/blogs" v-slot="{ list }">
        <div v-for="article in list" :key="article._path">
          <BlogLink v-if="!article._draft" :blog="article" />
        </div>
      </ContentList>
    </div>
    <div class="h-64 w-full bg-transparent"></div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss"></style>