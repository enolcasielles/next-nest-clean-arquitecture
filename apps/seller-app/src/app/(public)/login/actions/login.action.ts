"use server";

import { cookies } from "next/headers";

import { DI } from "@/di";
import { LoginUseCase } from "@application";
import { isLeft } from "@domain";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface Props {
  email: string;
  password: string;
}

export const login = async ({ email, password }: Props) => {
  const response = await new LoginUseCase().execute(
    {
      usersRepository: DI.usersRepository,
    },
    {
      email,
      password,
    },
  );
  console.log(response);

  if (isLeft(response)) {
    throw response.left;
  }
  const token = response.right.token;
  cookies().set("token", token);
  revalidatePath("/products");
  redirect("/products");
};
