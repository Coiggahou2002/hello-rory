<script setup lang="ts">
useGlobalSearchModal();
</script>

<template>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  </Head>
  <div class="flex flex-col justify-center items-center">
    <Nav />
    <ClientOnly>
      <SearchModal />
    </ClientOnly>
    <!-- <main class="w-full max-w-screen-lg"> -->
    <main class="w-full max-w-screen-md px-8 lg:px-0">
      <NuxtPage />
    </main>
  </div>
</template>
<style>
html {
  /* font-family: 'Fira Sans Condensed' !important; */
  /* font-family: 'Fira Sans', sans-serif !important; */
  /* font-family: 'Crimson Pro' !important; */
  /* font-family: 'Ubuntu Condensed' !important; */
  /* font-family: 'Roboto' !important; */
  /* font-family: 'Ubuntu' !important; */
  /* font-family: 'Lato' !important; */
  font-family: 'Barlow' !important;
  font-size: 18px;
  scroll-behavior: smooth;
  @apply text-slate-700 selection:text-gray-800 selection:bg-gray-200 dark:selection:bg-gray-700 dark:selection:text-gray-200;

  overflow-x: hidden;
}

body {
  @apply dark:bg-gray-800 bg-gray-50;
}

h1,
h2,
h3,
h4,
p,
span {
  /* @apply text-slate-600 dark:text-slate-300; */
  @apply text-gray-600 dark:text-gray-300;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
