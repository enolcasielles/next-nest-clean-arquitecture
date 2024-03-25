import { isLeft } from "@domain";
import { DataTable } from "@/components/ui/data-table";
import { ProductsTableColumns } from "./components/ProductsTableColumns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProducts } from "./actions/get-products.action";

async function Page() {
  const response = await getProducts();

  if (isLeft(response)) {
    return <div>Error: {response.left.errors}</div>;
  }
  const products = response.right;

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
