import { type GetPaginatedRequest } from "./get-paginated.request";

export interface GetProductsRequest extends GetPaginatedRequest {
  titleSearch?: string;
  category?: string;
}
