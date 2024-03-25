import { cookies } from "next/headers";

import { DI } from "@/di";
import { GetProductsUseCase, ResolveTokenUseCase } from "@application";
import { isLeft } from "@domain";

export const getProducts = async () => {
  const cookiesStore = cookies();
  const tokenResponse = await new ResolveTokenUseCase().execute(null, {
    token: cookiesStore.get("token").value,
  });
  if (isLeft(tokenResponse)) return tokenResponse;
  const userId = tokenResponse.right.userId;
  const response = await new GetProductsUseCase().execute(
    {
      productsRepository: DI.productsRepository,
    },
    { userId: userId, query: {} },
  );
  return response;
};
