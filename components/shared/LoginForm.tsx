
"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CardWrapper from "./CardWrapper";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    Cookies.remove('token');
  }, []);

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        Cookies.set('token', token);
        console.log('User logged in successfully!');
        form.reset();
        router.push('/');
      } else {
        const errorData = await response.json();
        setApiError(errorData.error || 'An error occurred');
      }
    } catch (error) {
      setApiError('An error occurred');
    }
  };

  return (
    <CardWrapper
      title="Login"
      footerContent={<Button type="submit">Login</Button>}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormProvider {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
      </FormProvider>
    </CardWrapper>
  );
}
