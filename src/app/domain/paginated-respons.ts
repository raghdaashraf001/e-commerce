export interface PaginatedResponse<T> {
  results: number;
  data: T[];
  metadata: Metadata;
}

export interface Metadata {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  nextPage: number;
}
