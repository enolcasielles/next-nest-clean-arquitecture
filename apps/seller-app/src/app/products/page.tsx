import { GetProductsUseCase } from "@application";
import { isLeft } from "@domain";
import { DataTable } from "@/components/ui/data-table";
import { DI } from "@/di";
import { ProductsTableColumns } from "./components/ProductsTableColumns";

async function Page() {
  const response = await new GetProductsUseCase().execute(
    {
      productsRepository: DI.productsRepository,
    },
    { userId: "1", query: {} },
  );

  if (isLeft(response)) {
    return <div>Error: {response.left.errors}</div>;
  }
  const products = response.right;

  return <DataTable columns={ProductsTableColumns} data={products.items} />;
}

export default Page;
