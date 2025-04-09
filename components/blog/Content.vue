<template>
  <div class="">
    <ProseH1>{{ blog.title }}</ProseH1>
    <div v-if="time" class="text-gray-400 mb-4 text-lg">{{ time }}</div>
    <ContentRenderer :value="withHeading1Removed" />
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/types";

interface BlogLinkProps {
  blog: ParsedContent;
}
const props = withDefaults(defineProps<BlogLinkProps>(), {});

const dayjs = useDayjs();

onMounted(() => {
  console.log(props.blog);
});
const time = computed(() => {
  if (!props.blog.time) {
    return "";
  }
  return dayjs(props.blog.time).format("MMM DD, YYYY");
});

const withHeading1Removed = computed(() => {
  const root = props.blog.body;
  const children = root?.children || [];
  const newChildren = (() => {
    const heading1Index = children.findIndex((child) => child.tag === "h1");
    if (heading1Index > -1) {
      return [...children.slice(0, heading1Index), ...children.slice(heading1Index + 1)];
    }
    return children;
  })();
  return {
    ...props.blog,
    body: {
      ...root,
      children: newChildren,
    },
  };
});
</script>

<style scoped lang="scss"></style>
