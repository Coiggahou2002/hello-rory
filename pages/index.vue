<script lang="ts" setup>
// import Clickable from '~/components/Clickable.vue'
import NuxtSvg from '@/assets/nuxt-logo.svg';
import ViteLogo from '@/assets/vite.svg';
import TencentLogo from '@/assets/ten.svg';
import VueLogo from '@/assets/vue.svg';
import NodeJSLogo from '@/assets/nodejs-icon.svg';
import K8sLogo from '@/assets/kubernetes.svg';
import ReactLogo from '@/assets/react.svg';
import TailwindLogo from '@/assets/tailwind.svg';
import TSLogo from '@/assets/typescript.svg';
import DockerLogo from '@/assets/docker.svg';
import GolangLogo from '@/assets/golang.svg';
import PromLogo from '@/assets/prometheus.svg';
import GrafanaLogo from '@/assets/grafana.svg';
import PythonLogo from '@/assets/python.svg';
import MongoLogo from '@/assets/mongodb.svg';

import confetti from 'canvas-confetti';


const { $anime } = useNuxtApp()

const handleNameClick = (e: MouseEvent) => {
   confetti({
      // particleCount: 100,
      // spread: 70,
      origin: {
         // x: x.value,
         // y: y.value,
         x: e.clientX / window.innerWidth,
         y: e.clientY / window.innerHeight,
      }
   });
}

onMounted(() => {
   $anime({
      targets: '.tech_item',
      opacity: [0, 1],
      translateX: [-100, 0],
      delay: $anime.stagger(100) // increase delay by 100ms for each elements.
   });
})
</script>

<template>
   <section class="w-full flex-col">
      <div class="flex">
         <article class="pr-4 basis-2/3 grow-0">
            <h1 class="text-title font-bold  mt-12 mb-8 select-none cursor-pointer" :style="{
            }" @click="handleNameClick">Rory Cai</h1>
            <h2 class="selfintro_text pb-6 font-light">Hey, I am Rory Cai, a full-stack developer.</h2>
            <div class="selfintro_text font-light">
               <span>Graduated from</span>
               <Clickable text="Harbin Institude of Technology" href="https://www.hitsz.edu.cn/">
                  <template #icon>
                     <img src="@/assets/images/hit.png" class="w-5 h-5 dark:invert dark:grayscale"/>
                  </template>
               </Clickable>
               <span>.</span>
            </div>
            <div class="selfintro_text font-light">
               <span>Currently working at</span>
               <Clickable text="Tencent" href="https://www.tencent.com/zh-cn/">
                  <template #icon>
                     <TencentLogo class="w-4 h-4" filled :font-controlled="false" />
                  </template>
               </Clickable>
               <span>as a frontend developer.</span>
            </div>
            <div class="selfintro_text font-light">
               <span>Fans of</span>
               <Clickable text="Nuxt" href="https://nuxt.com/">
                  <template #icon>
                     <NuxtSvg class="w-5 h-5" filled :font-controlled="false" />
                  </template>
               </Clickable>
               <Clickable text="Vite" href="https://vitejs.dev/">
                  <template #icon>
                     <ViteLogo class="w-5 h-5" filled :font-controlled="false" />
                  </template>
               </Clickable>
               <span>.</span>
            </div>


            <!-- TechStacks -->
            <p key="tech_title" class="selfintro_text pt-10 font-normal">An overview of my technical stacks:</p>
            <ul>
               <li class="tech_item">
                  <span class="tech_item_prefix">#</span>
                  <strong class="tech_item_key">Web</strong>:
                  <Clickable text="TypeScript">
                     <template #icon>
                        <TSLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
                  <Clickable text="Nuxt">
                     <template #icon>
                        <NuxtSvg class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
                  <Clickable text="Vue">
                     <template #icon>
                        <VueLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
                  <Clickable text="Tailwind">
                     <template #icon>
                        <TailwindLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
               </li>
               <li class="tech_item">
                  <span class="tech_item_prefix">#</span>
                  <strong class="tech_item_key">Mobile</strong>:
                  <Clickable text="React Native">
                     <template #icon>
                        <ReactLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
                  <!-- <Clickable text="Vue">
                        <template #icon>
                           <VueLogo class="w-5 h-5" filled :font-controlled="false" />
                        </template>
                     </Clickable> -->
               </li>
               <li class="tech_item">
                  <span class="tech_item_prefix">#</span>
                  <strong class="tech_item_key">Backend</strong>:
                  <Clickable text="Golang">
                     <template #icon>
                        <GolangLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
                  <Clickable text="Node.js">
                     <template #icon>
                        <NodeJSLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
               </li>
               <li class="tech_item">
                  <span class="tech_item_prefix">#</span>
                  <strong class="tech_item_key">Scripting</strong>:
                  <Clickable text="Python">
                     <template #icon>
                        <PythonLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
               </li>
               <li class="tech_item">
                  <span class="tech_item_prefix">#</span>
                  <strong class="tech_item_key">Database</strong>:
                  <Clickable text="MongoDB">
                     <template #icon>
                        <MongoLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
               </li>
               <li class="tech_item">
                  <span class="tech_item_prefix">#</span>
                  <strong class="tech_item_key">Cloud Native</strong>:
                  <Clickable text="Docker">
                     <template #icon>
                        <DockerLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
                  <Clickable text="Kubernetes">
                     <template #icon>
                        <K8sLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
                  <Clickable text="Prometheus">
                     <template #icon>
                        <PromLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
                  <Clickable text="Grafana">
                     <template #icon>
                        <GrafanaLogo class="w-5 h-5" filled :font-controlled="false" />
                     </template>
                  </Clickable>
               </li>
            </ul>

            <p key="interests" class="selfintro_text pt-10 font-normal">Interested in:</p>
            <ul>
               <li class="tech_item">
                  <span class="tech_item_prefix">#</span>
                  <strong class="tech_item_key">UI/UX Design</strong>
               </li>
               <li class="tech_item">
                  <span class="tech_item_prefix">#</span>
                  <span class="tech_item_key">Project Management</span>
               </li>
               <li class="tech_item">
                  <span class="tech_item_prefix">#</span>
                  <strong class="tech_item_key">Knowledge Management</strong>
               </li>
               <li class="tech_item">
                  <span class="tech_item_prefix">#</span>
                  <strong class="tech_item_key">Problem-solving-oriented Deep Learning</strong>
               </li>
            </ul>
         </article>
         <div class="basis-1/3 grow-0">
            <div class="mt-12 rounded-full overflow-hidden border-dashed border-2 dark:border-gray-700">
               <img class="dark:brightness-75" src="@/assets/images/roryc.png"/>
            </div>
         </div>
      </div>

      <!-- placeholder -->
      <div class="h-32 w-full"></div>
   </section>
</template>
 
<style>
.selfintro_text {
   @apply text-lg text-gray-600 my-2 leading-8;
}

.text-title {
   @apply text-4xl text-gray-800 dark:text-white;
}

.tech_item {
   @apply my-4 font-light;

   &_key {
      @apply font-light text-gray-600 dark:text-gray-400;
   }

   &_prefix {
      @apply text-gray-300 font-normal mr-1;
   }
}
</style>
 