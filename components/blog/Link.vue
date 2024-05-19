<template>
  <div class="blog_link_item flex items-baseline" @click="gotoBlog">
    <span class="blog_link_item_title">
      {{ blog.title }}
    </span>
    <span class="grow"></span>
    <span class="blog_link_item_date">{{ displayDate }}</span>
  </div>
</template>

<script setup lang='ts'>
import type { ParsedContent } from '@nuxt/content/types';

interface BlogLinkProps {
  blog: ParsedContent;
}
const props = withDefaults(defineProps<BlogLinkProps>(), {

});
const dayjs = useDayjs();


const { locale } = useI18n();
const displayDate = computed(() => {
  if (locale.value === 'zh') {
    return dayjs(props.blog.time).format('MM-DD');
  }
  return dayjs(props.blog.time).format('MMM D');
})

const router = useRouter();
const gotoBlog = () => {
  if (props.blog._path) {
    router.push(props.blog._path);
  }
}

onMounted(() => {
});
</script>

<style scoped lang="scss">
.blog_link {
  &_item {
    @apply my-3  transition-all cursor-pointer text-xl
    opacity-75 hover:opacity-100;

    &_title {
      @apply text-gray-800 font-normal 
      dark:text-white text-base md:text-xl
    }

    &_date {
      @apply ml-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-light min-w-12 text-right;
    }
  }
}
</style>