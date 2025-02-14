export type OffsetPagintor = {
  perPage: number;
  page: number;
  total: number;
};

export type OffsetPaginatorResult = {
  offset: Ref<number>;
  perPage: Ref<number>;
  total: Ref<number>;
};

export const useOffsetPaginator = (paginator: OffsetPagintor) => {
  let currentPage = paginator.page;

  const offset = ref((currentPage - 1) * paginator.perPage);
  const perPage = ref(paginator.perPage);
  const total = ref(paginator.total);

  const getLastPage = () => Math.ceil(total.value / perPage.value);
  const getCurrentPage = () => currentPage;
  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);

  const setPage = (page: number) => {
    if (page <= 1) {
      currentPage = 1;
    }

    if (page >= getLastPage()) {
      currentPage = getLastPage();
    }

    offset.value = (currentPage - 1) * perPage.value;
  };

  watch([offset, perPage], ([newOffset, newPerPage]) => {
    const newPage = Math.ceil(newOffset / newPerPage) + 1;

    if (currentPage !== newPage) {
      currentPage = newPage;
    }
  });

  return {
    offset,
    perPage,
    total,
    getLastPage,
    getCurrentPage,
    setPage,
    nextPage,
    prevPage,
  };
};
