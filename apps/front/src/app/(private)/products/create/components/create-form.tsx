"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { CustomError } from "@marketplace/domain";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createProductAction } from "../../actions/create-product.action";

const formSchema = z.object({
  title: z
    .string({
      required_error: "El título es obligatorio",
    })
    .min(2, "Ha de tener como mínimo 2 caracteres")
    .max(50, "Ha de tener como máximo 50 caracteres"),
  description: z
    .string({
      required_error: "La descripción es obligatoria",
    })
    .min(2, "Ha de tener como mínimo 2 caracteres")
    .max(50, "Ha de tener como máximo 50 caracteres"),
  price: z
    .number({
      required_error: "El precio es obligatorio",
    })
    .min(0, "El precio ha de ser mayor que 0"),
  category: z.string({
    required_error: "La categoría es obligatoria",
  }),
});

type ProductSchema = z.infer<typeof formSchema>;

function CreateForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string[]>(null);

  const form = useForm<ProductSchema>({
    resolver: zodResolver(formSchema),
  });

  const action: () => void = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      setError(null);
      await createProductAction(data);
      setSuccess(true);
    } catch (e: any) {
      const err = CustomError.fromError(e as Error);
      setError(err.errors);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form action={action} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio (€)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder=""
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CLOTHING">Ropa</SelectItem>
                  <SelectItem value="FOOD">Comida</SelectItem>
                  <SelectItem value="ELECTRONICS">Electrónica</SelectItem>
                  <SelectItem value="BOOKS">Libros</SelectItem>
                  <SelectItem value="OTHER">Otros</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button disabled={loading} className="mt-4 mb-2" type="submit">
            Crear Producto
          </Button>
          {success && (
            <p className="text-green-500">
              El producto se ha creado correctamente
            </p>
          )}
          {error && (
            <ul className="text-red-500">
              {error.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </Form>
  );
}

export default CreateForm;
