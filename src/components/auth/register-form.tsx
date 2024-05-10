"use client";

import type * as z from "zod";

import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterSchema} from "@schemas/index";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@ui/form";
import CardWrapper from "@components/auth/card-wrapper";
import {Input} from "@ui/input";
import {Button} from "@ui/button";
import {FormError} from "@components/form-error";
import {FormSucces} from "@components/form-succes";
import {EyeIcon, EyeOffIcon} from "lucide-react";

import {register} from "@/actions/server-actions/user/register";

export type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [viewPassword, setViewPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      username: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  function onSubmit(values: RegisterFormValues) {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  }

  return (
    <CardWrapper
      showSocial
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      hederLabel="Create an account"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="John Doe" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="johndoe" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="example@me.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-4">
                      <Input
                        disabled={isPending}
                        placeholder={viewPassword ? field.value : "********"}
                        type={viewPassword ? "text" : "password"}
                        {...field}
                      />
                      {viewPassword ? (
                        <EyeOffIcon
                          className="cursor-pointer"
                          onClick={() => setViewPassword(!viewPassword)}
                        />
                      ) : (
                        <EyeIcon
                          className="cursor-pointer"
                          onClick={() => setViewPassword(!viewPassword)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-4">
                      <Input
                        disabled={isPending}
                        placeholder={viewPassword ? field.value : "********"}
                        type={viewPassword ? "text" : "password"}
                        {...field}
                      />
                      {viewPassword ? (
                        <EyeOffIcon
                          className="cursor-pointer"
                          onClick={() => setViewPassword(!viewPassword)}
                        />
                      ) : (
                        <EyeIcon
                          className="cursor-pointer"
                          onClick={() => setViewPassword(!viewPassword)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSucces message={success} />

          <Button className="w-full" type="submit">
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
