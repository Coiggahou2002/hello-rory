<template>
   <a class="blog_toc_link" :style="{
      fontWeight: link.depth === 2 ? 'normal' : 'light',
   }" :href="`#${link.id}`" @mouseenter="handleMouseEnter">
      <span>{{ link.text }}</span>
   </a>
   <template v-if="link.children">
      <ul class="pl-4">
         <BlogTocLink v-for="child in link.children" :key="child.id" :link="child" />
      </ul>
   </template>
</template>

<script setup lang="ts">
import type { TocLink } from "@nuxt/content/types";

interface BlogTocLinkProps {
   link: TocLink;
}

const props = withDefaults(defineProps<BlogTocLinkProps>(), {});

// TODO: sync nav highlight item with content position
// const hash = useRouteHash();
// watch(hash, () => {
//    console.log(hash.value);
// })
// const matchedWithHash = computed(() => {
//    return hash.value === `#${props.link.id}`;
// })

const { $anime } = useNuxtApp();
const handleMouseEnter = useDebounceFn((e: MouseEvent) => {
   return;
   const [x, y] = [e.clientX, e.clientY]
   const targetDOM = e.target as HTMLElement;
   const spanInside = targetDOM.querySelector("span") as HTMLSpanElement;
   const { top, left, height } = targetDOM.getBoundingClientRect();
   const width = spanInside.getBoundingClientRect().width + 10;
   const RECT_ID = "moving-rect";
   const movingRect = document.getElementById(RECT_ID);
   if (movingRect) {
      $anime({
         targets: `#${RECT_ID}`,
         left: left,
         top: top,
         width: width,
         height: height,
         duration: 200,
         easing: "easeInOutQuad",
      });
   } else {
      const el = document.createElement("div");
      el.id = RECT_ID;
      el.style.position = "fixed";
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.borderRadius = "4px";
      el.style.zIndex = '-1';
      el.classList.add('bg-gray-200')
      document.documentElement.appendChild(el);
   }
}, 100);
</script>

<script setup lang="ts"></script>

<style scoped lang="scss">
.blog_toc_link {
   display: block;

   @apply mb-2 text-gray-500 text-sm font-light hover:text-gray-700 decoration-1
   underline underline-offset-4 decoration-gray-500/0 hover:decoration-gray-500;
   transition: all 0.3s;
}
</style>
