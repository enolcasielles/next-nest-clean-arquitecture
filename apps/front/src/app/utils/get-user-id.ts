import { cookies } from "next/headers";

import { ResolveTokenUseCase } from "@marketplace/application";

export default async function getUserId() {
  const cookiesStore = cookies();
  const tokenResponse = await new ResolveTokenUseCase(null).execute({
    token: cookiesStore.get("token").value,
  });
  return tokenResponse.userId.toString();
}
