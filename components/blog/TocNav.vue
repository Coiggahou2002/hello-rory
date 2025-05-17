<template>
   <div>
      <ul class="tocnav">
         <BlogTocLink v-for="link of toc.links" :key="link.id" :link="link" />
      </ul>
   </div>
</template>

<script lang="ts" setup>
import type { Toc } from '@nuxt/content/types';
import { useRouteHash } from '@vueuse/router';

interface TocNavProps {
   toc: Toc;
}
const props = withDefaults(defineProps<TocNavProps>(), {
   toc: {
      links: []
   }
})

// const handleMouseLeaveTocNav = () => {
//    const movingRect = document.getElementById("moving-rect");
//    if (movingRect) {
//       movingRect.remove();
//    }
// }

</script>

<style lang="scss" scoped>
.tocnav {
   max-height: 60vh;
   overflow-y: scroll;
   overflow-x: hidden;
}
</style>