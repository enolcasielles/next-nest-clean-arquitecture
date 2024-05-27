"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CustomError } from "@domain";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAction } from "../actions/login.action";

const formSchema = z.object({
  email: z
    .string({
      required_error: "El email es obligatorio",
    })
    .email("El email no es válido"),
  password: z.string({
    required_error: "La contraseña es obligatoria",
  }),
});

type LoginSchema = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(null);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const action: () => void = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      await loginAction({
        email: data.email,
        password: data.password,
      });
    } catch (e: any) {
      const err = CustomError.fromError(e as Error);
      setError(err.errors[0]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>ACME</CardTitle>
        <CardDescription>Inicia sesión para acceder al sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={action} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button disabled={loading} className="mt-4 mb-2" type="submit">
                Iniciar sesión
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
