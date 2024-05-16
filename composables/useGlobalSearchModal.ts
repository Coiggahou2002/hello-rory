const useGlobalSearchModal = () => {
    const searchStore = useSearchStore();
    // searchStore.init();

    const {
        isSearchModalOpen,
        activeResultIndex,
        searchValue,
        searchResults,
    } = storeToRefs(searchStore);

    watch(searchValue, (val) => {
        if (val === "") {
            return;
        }
        searchContent(val).then((res) => {
            // computed ref
            searchResults.value = res;
        }).catch((err) => {
            console.error(err);
        });
    })

    const {
        openSearchModal,
        closeSearchModal,
    } = searchStore;

    const curSelectedBlog = computed(() => {
        return searchResults.value?.[activeResultIndex.value];
    })
    
    const router = useRouter();
    const focusOnSearchInput = () => {
        const el = document.getElementById('search_modal_input');
        (el as HTMLInputElement)?.focus();
    };
    const openModal = () => {
        openSearchModal();
        nextTick(() => {
            focusOnSearchInput();
        })
    };
    const closeModal = () => {
        searchValue.value = "";
        activeResultIndex.value = 0;
        closeSearchModal();
    };
    const gotoSelectedBlog = () => {
        if (!curSelectedBlog.value) return;
        closeModal();
        router.push(curSelectedBlog.value.id);
    };
    onMounted(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "k" && e.metaKey) {
                openModal();
                return;
            }
            if (e.key === "Escape") {
                closeModal();
                return;
            }
        })
    })
    return {
        searchValue,
        activeResultIndex,
        results: searchResults,
        isOpen: isSearchModalOpen,
        openModal,
        closeModal,
        focusOnSearchInput,
        gotoSelectedBlog,
    }
}

export default useGlobalSearchModal;