import type { DateTime } from 'luxon';

export interface SearchStore {
  categories: string[] | null | undefined;
  date: DateTime | null | undefined;
  address: string | null | undefined;
  name: string | null | undefined;
}

export const useSearchStore = defineStore('search', {
  state: (): SearchStore => ({
    categories: [],
    date: null,
    address: null,
    name: null,
  }),
  actions: {
    clear() {
      this.name = null;
      this.categories = [];
      this.date = null;
      this.address = null;
    },
  },
});
