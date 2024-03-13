"use client";

import { Box, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { PropsWithChildren } from "react";

function SideBar({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col md:flex-row">
      <Sheet>
        <SheetTrigger className="md:hidden" asChild>
          <Menu className="m-4 cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-4 py-4">
            <Content />
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden md:block bg-gray-100 w-64 h-screen">
        <Content />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

const Content = () => {
  return (
    <>
      <div className="flex justify-center pt-4">
        <Link href="/">
          <h1 className="text-black text-5xl">ACME</h1>
        </Link>
      </div>
      <Link href="/products">
        <div className="flex items-center justify-center gap-2 text-black mt-4 p-4 hover:bg-slate-200">
          <Box />
          <span>Mis Productos</span>
        </div>
      </Link>
      <Link href="/products">
        <div className="flex items-center justify-center gap-2 text-black p-4 hover:bg-slate-200">
          <ShoppingCart />
          <span>Mis Pedidos</span>
        </div>
      </Link>
    </>
  );
};

export default SideBar;
