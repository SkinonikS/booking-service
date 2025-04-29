export interface SearchStore {
  categories: string[] | null | undefined;
  date: Date | null | undefined;
  address: string | null | undefined;
}

export const useSearchStore = defineStore('search', {
  state: (): SearchStore => ({
    categories: [],
    date: null,
    address: null,
  }),
  actions: {
    clear() {
      this.categories = [];
      this.date = null;
      this.address = null;
    },
  },
});
