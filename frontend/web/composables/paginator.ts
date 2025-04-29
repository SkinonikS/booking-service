export type OffsetPaginator = {
  perPage: number;
  page: number;
  total: number;
};

export type OffsetPaginatorResult = {
  offset: Ref<number>;
  perPage: Ref<number>;
  total: Ref<number>;
};

export const useOffsetPaginator = (paginator: OffsetPaginator) => {
  const offset = ref((paginator.page - 1) * paginator.perPage);
  const perPage = ref(paginator.perPage);
  const total = ref(paginator.total);

  const getCurrentPage = () => Math.floor(offset.value / perPage.value) + 1;
  const getLastPage = () => Math.ceil(total.value / perPage.value);

  const setPage = (page: number) => {
    if (page <= 1) {
      page = 1;
    } else if (page >= getLastPage()) {
      page = getLastPage();
    }

    offset.value = (page - 1) * perPage.value;
  };

  const nextPage = () => setPage(getCurrentPage() + 1);
  const prevPage = () => setPage(getCurrentPage() - 1);

  return { offset, perPage, total, getLastPage, getCurrentPage, setPage, nextPage, prevPage };
};

