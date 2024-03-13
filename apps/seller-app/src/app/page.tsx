export default async function Home(): Promise<any> {
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
