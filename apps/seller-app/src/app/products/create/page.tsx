import CreateForm from "./components/create-form";

async function Page() {
  return (
    <main className="w-full max-w-2xl m-auto md:mt-10 p-8">
      <h1 className="text-3xl">Crear nuevo producto</h1>
      <div className="mt-10">
        <CreateForm />
      </div>
    </main>
  );
}

export default Page;
