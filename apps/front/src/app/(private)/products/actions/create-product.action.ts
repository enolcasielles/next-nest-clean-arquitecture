"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { CreateProductUseCase } from "@application";

import { DI } from "@/di";
import getUserId from "@/app/utils/get-user-id";
import handleActionsError from "@/app/utils/handle-actions-error";

export const createProductAction = async (product: any) => {
  await handleActionsError(async () => {
    const userId = await getUserId();
    const { title, price, description, category } = product;
    await new CreateProductUseCase({
      productsRepository: DI.productsRepository,
    }).execute({
      userId: userId,
      product: {
        title,
        price,
        description,
        category,
      },
    });
  });
  revalidatePath("/products");
  redirect("/products");
};
