"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DeleteProductUseCase } from "@marketplace/application";

import getUserId from "@/app/utils/get-user-id";
import { DI } from "@/di";
import handleActionsError from "@/app/utils/handle-actions-error";

export const deleteProductAction = async (productId: string) => {
  await handleActionsError(async () => {
    const userId = await getUserId();
    const usecase = new DeleteProductUseCase({
      productsRepository: DI.productsRepository,
      usersRepository: DI.usersRepository,
    });
    await usecase.execute({
      userId,
      productId,
    });
  });
  revalidatePath("/products");
  redirect("/products");
};
