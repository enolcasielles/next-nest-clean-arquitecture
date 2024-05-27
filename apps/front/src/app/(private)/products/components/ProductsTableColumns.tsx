"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { type ProductEntity } from "@domain";

import DeleteButton from "./DeleteButton";

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
  {
    header: "Acciones",
    cell: (props) => {
      return <DeleteButton productId={props.row.original.id} />;
    },
  },
];
