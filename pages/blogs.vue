<template>
  <div>
    <div class="w-full flex-col flex">
      <ContentList path="/blogs" v-slot="{ list }">
        <div v-for="article in sorted" :key="article._path">
          <BlogLink v-if="!article._draft" :blog="article" />
          <!-- {{ slots.default }} -->
        </div>
      </ContentList>
    </div>
    <div class="h-64 w-full bg-transparent"></div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const data = await queryContent(route.path).find();

const sorted = computed(() => {
  return data
    // .filter((article) => !!article.time)
    .sort((a, b) => {
      const dateKey = "time";
      // 检查 a 是否有 date 字段
      const hasDateA = dateKey in a;
      // 检查 b 是否有 date 字段
      const hasDateB = dateKey in b;

      if (!hasDateA && !hasDateB) {
        // 如果 a 和 b 都没有 date 字段，则保持它们的相对顺序
        return 0;
      } else if (!hasDateA) {
        // 如果 a 没有 date 字段，b 有，则将 a 排到后面
        return 1;
      } else if (!hasDateB) {
        // 如果 b 没有 date 字段，a 有，则将 b 排到后面
        return -1;
      }

      // 将 date 字符串转换为日期对象
      const dateA = +new Date(a[dateKey] as string | number);
      const dateB = +new Date(b[dateKey] as string | number);

      // 倒序排序
      return dateB - dateA;
    });
});
</script>

<style scoped lang="scss"></style>
