<template>
  <div class="blog_link_item" @click="gotoBlog">
    <span class="blog_link_item_title">
      {{ blog.title }}
    </span>
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


const displayDate = computed(() => {
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
    @apply my-4  transition-all cursor-pointer text-xl
    opacity-50 hover:opacity-100;

    &_title {
      @apply text-gray-800 
      dark:text-white
    }

    &_date {
      @apply ml-2 text-sm text-gray-400 font-light;
    }
  }
}
</style>