import { GetProductsUseCase } from "@application";

import { DI } from "@/di";
import getUserId from "@/app/utils/get-user-id";
import handleActionsError from "@/app/utils/handle-actions-error";

export const getProductsAction = async () => {
  return handleActionsError(async () => {
    const userId = await getUserId();
    return await new GetProductsUseCase({
      productsRepository: DI.productsRepository,
      usersRepository: DI.usersRepository,
    }).execute({ userId: userId, query: {} });
  });
};
