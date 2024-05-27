"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { LoginUseCase } from "@application";

import { DI } from "@/di";
import handleActionsError from "@/app/utils/handle-actions-error";

interface Props {
  email: string;
  password: string;
}

export const loginAction = async ({ email, password }: Props) => {
  await handleActionsError(async () => {
    const response = await new LoginUseCase({
      usersRepository: DI.usersRepository,
    }).execute({
      email,
      password,
    });
    const token = response.token;
    cookies().set("token", token, { httpOnly: true });
  });
  revalidatePath("/products");
  redirect("/products");
};
