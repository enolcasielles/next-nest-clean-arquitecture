import { redirect } from "next/navigation";

export default async function Home(): Promise<any> {
  redirect("/products");
}
