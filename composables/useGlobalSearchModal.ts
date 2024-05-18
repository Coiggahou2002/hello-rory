
const useGlobalSearchModal = () => {
    const searchStore = useSearchStore();

    const {
        isSearchModalOpen,
        activeResultIndex,
        searchValue,
        results
    } = storeToRefs(searchStore);

    watch(searchValue, (val) => {
        if (val == "") {
            return
        }
        searchContent(val).then(res => {
            results.value = res;
        }).catch(err => {
            console.error(err);
        });
    });

    const {
        openSearchModal,
        closeSearchModal,
    } = searchStore;

    const curSelectedBlog = computed(() => {
        return results.value?.[activeResultIndex.value];
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
        results: results,
        isOpen: isSearchModalOpen,
        openModal,
        closeModal,
        focusOnSearchInput,
        gotoSelectedBlog,
    }
}

export default useGlobalSearchModal;