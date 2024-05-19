<template>
   <p key="interests" class="selfintro_text pt-10 font-normal">Interested in:</p>
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
   @apply my-3 font-light;

   &_key {
      @apply font-light text-gray-600 dark:text-gray-400;
   }

   &_prefix {
      @apply text-gray-300 font-normal mr-1;
   }
}
</style>