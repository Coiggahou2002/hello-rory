<template>
   <p key="interests" class="text-lg text-gray-600 dark:text-gray-300 my-2 leading-8 pt-10 font-semibold">{{ capitalize($t('interested_in')) }}:</p>
   <ul>
      <li class="interest_item" v-for="i in INTERESTS">
         <span class="interest_item_prefix">#</span>
         <strong class="interest_item_key">{{ i }}</strong>
      </li>
   </ul>
</template>

<script setup lang='ts'>
const { t } = useI18n();

const INTERESTS = [
   t('ui_ux_design'),
   t('project_management'),
   t('knowledge_management'),
   t('problem_solving_oriented_deep_learning'),
]

</script>

<style scoped lang="scss">
.interest_item {
   @apply my-3;

   &_key {
      @apply font-normal text-gray-600 dark:text-gray-400;
   }

   &_prefix {
      @apply text-gray-300 dark:text-gray-600 font-normal mr-1;
   }
}
</style>