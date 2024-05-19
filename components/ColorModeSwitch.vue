<template>
  <div class="cursor-pointer p-2 w-10 h-10 border-gray-400 text-gray-800 rounded" @click="toggleColorMode">
    <ColorScheme placeholder="..." tag="span">
      <SvgoDark key="darkicon" v-if="colorMode.value === 'dark'" :font-controlled="false"
        class="text-gray-500 dark:hover:text-gray-400" />
      <SvgoLight key="lighticon" v-if="colorMode.value === 'light'" :font-controlled="false"
        class="text-gray-600 hover:text-gray-800" />
    </ColorScheme>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
const toggleColorMode = (e: MouseEvent) => {
  if (!document.startViewTransition) {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    return;
  }
  const { clientX, clientY } = e;
  const r = Math.hypot(
    Math.max(clientX, innerWidth - clientX),
    Math.max(clientY, innerHeight - clientY)
  );
  const isDark = colorMode.value === 'dark';
  document.startViewTransition(() => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }).ready.then(() => {

    // light -> enlarge 
    const enlargeCircle = [`circle(0 at ${clientX}px ${clientY}px)`, `circle(${r}px at ${clientX}px ${clientY}px)`];
    const narrowCircle = [...enlargeCircle].reverse();

    // click [sun] when is light
    // aims to light-->dark (old view: light, new view: dark)
    // narrow white circle --> turn to dark
    if (!isDark) {
      document.documentElement.animate({
        clipPath: narrowCircle,
      }, {
        duration: 300,
        easing: "ease-in",
        pseudoElement: "::view-transition-old(root)"
      })
    }

    // click [moon] when is dark
    // aims to dark-->light (old view: dark, new view: light)
    // enlarge white circle --> turn to white
    else {
      document.documentElement.animate({
        clipPath: enlargeCircle
      }, {
        duration: 300,
        easing: "ease-in",
        pseudoElement: "::view-transition-new(root)"
      })
    }
  });
};
</script>

<style lang="css">
/* 
  该动画还需要以下 CSS，以关闭默认的 CSS 动画并防止新旧视图状态以任何方式混合（新状态从旧状态上方“擦除”，而不是过渡） 
*/
::view-transition-old(root),::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
    /* display: block; */
}

/* light mode: light->dark, light 1, dark 9999,  narrowWhiteCircle,  animate at old view */
::view-transition-old(root) {
    z-index: 1
}

::view-transition-new(root) {
    z-index: 9999
}

/* dark mode: dark->light, dark 9999, light 1,  enlargeWhiteCircle, animate at new view */
.dark::view-transition-old(root) {
    z-index: 9999
}

.dark::view-transition-new(root) {
    z-index: 1
}

</style>