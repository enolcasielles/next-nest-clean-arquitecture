"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type ProductEntity } from "@domain";

export const ProductsTableColumns: Array<ColumnDef<ProductEntity>> = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "category",
    header: "Categoría",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
];
