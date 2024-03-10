"use server";

import { DI } from "@/di";
import { CreateProductUseCase } from "@application";
import { isLeft } from "@domain";

export const createProduct = async (product: any) => {
  const { title, price, description, category } = product;
  const response = await new CreateProductUseCase().execute(
    {
      productsRepository: DI.productsRepository,
    },
    {
      userId: "1",
      product: {
        title,
        price,
        description,
        category,
      },
    },
  );
  if (isLeft(response)) {
    throw response.left;
  }
  return response.right;
};
