"use client"

import type * as z from "zod"

import {useState, useTransition} from "react"
import {useForm} from "react-hook-form"
import {useSearchParams} from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"
import {EyeIcon, EyeOffIcon} from "lucide-react"

import {LoginSchema} from "@schemas/index"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@ui/form"
import CardWrapper from "@components/auth/card-wrapper"
import {Input} from "@ui/input"
import {Button} from "@ui/button"
import {FormError} from "@components/form-error"
import {FormSucces} from "@components/form-succes"
import {login} from "@/actions/server-actions/user/login"

export type LoginFormValues = z.infer<typeof LoginSchema>

export interface ResponseServerAction {
  error?: string
  success?: string
}

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : ""

  const [error, setError] = useState<string | undefined>("")
  const [viewPassword, setViewPassword] = useState(false)

  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  })

  function onSubmit(values: LoginFormValues) {
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values).then((res?: ResponseServerAction) => {
        if (res?.error) {
          setError(res.error)
        }
        if (res?.success) {
          setSuccess(res.success)
        }
      })
    })
  }

  return (
    <CardWrapper
      showSocial
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      hederLabel="Welcome back"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                    <div className="flex items-center justify-between space-x-2">
                      <Input
                        disabled={isPending}
                        placeholder="********"
                        type={viewPassword ? "text" : "password"}
                        {...field}
                      />
                      {viewPassword ? (
                        <EyeIcon
                          className="cursor-pointer"
                          onClick={() => setViewPassword(!viewPassword)}
                        />
                      ) : (
                        <EyeOffIcon
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
          <FormError message={error || urlError} />
          <FormSucces message={success} />

          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
