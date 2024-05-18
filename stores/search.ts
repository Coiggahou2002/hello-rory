interface GlobalState {
    isSearchModalOpen: boolean;
    activeResultIndex: number;
    searchValue: string;
    results: unknown[];
}
export const useSearchStore = defineStore('global', {
    state: (): GlobalState => {
        return {
            isSearchModalOpen: false,
            searchValue: '',
            results: [],
            activeResultIndex: 0,
        }
    },
    actions: {
        openSearchModal() {
            this.isSearchModalOpen = true;
        },
        closeSearchModal() {
            this.isSearchModalOpen = false;
        },
    },
})