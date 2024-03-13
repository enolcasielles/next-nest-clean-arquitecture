import SideBar from "@/components/layout/side-bar";
import { PropsWithChildren } from "react";

function PrivateLayout({ children }: PropsWithChildren) {
  return <SideBar>{children}</SideBar>;
}

export default PrivateLayout;
