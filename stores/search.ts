interface GlobalState {
    isSearchModalOpen: boolean;
    activeResultIndex: number;
    searchValue: string;
    searchResults: any[];
}
export const useSearchStore = defineStore('global', {
    state: (): GlobalState => {
        return {
            isSearchModalOpen: false,
            searchValue: '',
            activeResultIndex: 0,
            searchResults: [],
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