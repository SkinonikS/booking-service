export interface PaginatorInfo {
  total: number;
  currentPage: number;
  perPage: number;
}

export interface GraphqlPaginatedResponse<T = unknown> {
  data: T[];
  paginatorInfo: PaginatorInfo;
}
