import SideBar from "@/components/layout/side-bar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

async function PrivateLayout({ children }: PropsWithChildren) {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) redirect("/login");
  return <SideBar>{children}</SideBar>;
}

export default PrivateLayout;
