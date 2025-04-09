<template>
  <div class="page_bg max-w-screen-md">
    <main class="flex flex-col">
      <div class="relative">
        <ContentDoc>
          <template v-slot="{ doc }">
            <BlogTocNav class="tocnav absolute ml-4 invisible xl:visible overflow-auto" :toc="doc.body?.toc" />
            <article >
              <BlogContent :blog="doc" />
            </article>
          </template>
          <template #not-found>
            <h1>Document not found</h1>
          </template>
        </ContentDoc>
        <div class="h-64 w-full bg-transparent"></div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.tocnav {
  position: fixed;
  transform: translateX(-260px) translateY(100px);
  width: 200px;
}
</style>
