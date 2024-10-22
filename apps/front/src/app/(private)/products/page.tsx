import Link from "next/link";

import {
  CustomError,
  PaginatedResponse,
  ProductEntity,
} from "@marketplace/domain";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { getDataOrError } from "@/app/utils/get-data-or-error";
import { ProductsTableColumns } from "./components/ProductsTableColumns";
import { getProductsAction } from "./actions/get-products.action";

async function Page() {
  const response =
    await getDataOrError<PaginatedResponse<ProductEntity>>(getProductsAction());

  if (response instanceof CustomError) {
    return <div>Error: {response.errors}</div>;
  }
  const products = response as PaginatedResponse<ProductEntity>;

  return (
    <main className="w-full max-w-2xl m-auto md:mt-10 p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl">Mis Productos</h1>
        <Link href="/products/create">
          <Button>Añadir</Button>
        </Link>
      </div>
      <div className="mt-10">
        <DataTable columns={ProductsTableColumns} data={products.items} />
      </div>
    </main>
  );
}

export default Page;
