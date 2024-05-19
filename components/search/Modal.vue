<template>
   <!-- <Transition> -->
      <div id="search_modal_mask" ref="SearchModalRef" v-show="isOpen" class="mask" @click.self="closeModal">
         <div class="search_modal">
            <div class="search_modal_inputw flex justify-center items-center">
               <SvgoSearch class="h-5 w-5 mr-2" filled :font-controlled="false" />
               <input autocomplete="off" id="search_modal_input" class="search_modal_input" :placeholder="$t('search_any_contents')"
                  v-model="searchValue" @keyup="handleKeyUp" @keydown="handleKeyDown" />
            </div>
            <div ref="SearchModalResultRef" class="search_modal_result" v-if="searchValue">
                  <div v-for="(r, idx) in results" :class="['search_modal_result_item', {
                     'selected': activeResultIndex === idx
                  }]" @click="gotoBlog">
                     <div class="search_modal_result_item_title">{{ r.title }}</div>
                     <div class="search_modal_result_item_desc">{{ r.content }}</div>
                  </div>
            </div>
         </div>
      </div>
   <!-- </Transition> -->
</template>

<script setup lang="ts">

const SearchModalResultRef = ref<HTMLDivElement | null>(null);

const { searchValue, closeModal, openModal, isOpen, gotoSelectedBlog, activeResultIndex, results } = useGlobalSearchModal();

const gotoBlog = () => {
   gotoSelectedBlog();
   // closeModal();
   // router.push(r.id);
}

const SearchModalRef = ref<HTMLDivElement | null>(null);

const handleKeyDown = (e: KeyboardEvent) => {
   if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
   }
}

const handleKeyUp = (e: KeyboardEvent) => {
   if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (results.value.length === 0) return;
      e.preventDefault();
      if (e.key === "ArrowUp") {
         activeResultIndex.value = (activeResultIndex.value - 1 + results.value.length) % results.value.length;
      }
      if (e.key === "ArrowDown") {
         activeResultIndex.value = (activeResultIndex.value + 1) % results.value.length;
      }
      nextTick(() => {
         SearchModalResultRef.value?.querySelector("div.selected")?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
         });
      })
   }
   if (e.key === "Enter") {
      gotoBlog();
   }
}

</script>

<style scoped lang="scss">
.mask {
   @apply bg-gray-200/75 dark:bg-gray-600/50 fixed top-0 left-0 right-0 bottom-0 z-50 
   backdrop-blur-lg
   transition-all;
}

.search_modal {
   top: 20vh;
   left: 50vw;
   @apply fixed mx-auto -translate-x-1/2 bg-white dark:bg-gray-800 shadow-2xl drop-shadow rounded-xl w-1/2 overflow-hidden;

   &_inputw {
      @apply p-4;

      input {
         @apply font-light text-lg w-full bg-transparent dark:text-white;

         &::placeholder {
            @apply text-gray-300 dark:text-gray-400;
         }

         &:focus {
            outline: none;
         }
      }
   }

   &_result {
      max-height: 50vh;
      overflow-y: scroll;

      &_item {
         @apply px-4 m-1 rounded-md py-2 text-gray-800 dark:text-gray-200 hover:dark:text-gray-100 cursor-pointer;

         &.selected {
            @apply bg-gray-200/75 dark:bg-gray-700;
         }

         &_title {
            @apply text-base font-semibold;
         }

         &_desc {
            @apply text-xs text-gray-400 font-light;
         }
      }
   }
}


// .v-enter-active,
// .v-leave-active {
//    transition: opacity 0.2s ease;
// }

// .v-enter-from,
// .v-leave-to {
//    opacity: 0;
// }
</style>
