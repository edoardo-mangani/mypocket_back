export interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface PaginationParams {
  page?: number
  perPage?: number
}
