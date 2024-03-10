export interface PaginatedResponse<T> {
  items: T[];
  itemCount: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
