<script lang="ts" setup>
</script>

<template>
   <div class="w-full flex-col">
      <div class="flex flex-col md:flex-row-reverse">
         <section class="basis-1/3 grow-0">
            <ProfileAvatar/>
         </section>
         <section class="pr-4 basis-2/3 grow-0">
            <ProfileSelfIntro/>
            <ProfileTechStack/>
            <ProfileInterests/>
         </section>
      </div>
      <!-- placeholder -->
      <div class="h-32 w-full"></div>
   </div>
</template>
 
<style>
.selfintro_text {
   @apply text-lg text-gray-600 my-2 leading-8;
}

.text-title {
   @apply text-4xl text-gray-800 dark:text-white;
}
</style>
 