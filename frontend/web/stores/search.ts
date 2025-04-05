export interface SearchStore {
  categories: string[];
  date: Date | null;
}

export const useSearchStore = defineStore('search', {
  state: (): SearchStore => ({
    categories: [],
    date: null,
  }),
  actions: {
    clear() {
      this.categories = [];
      this.date = null;
    },
  },
});
