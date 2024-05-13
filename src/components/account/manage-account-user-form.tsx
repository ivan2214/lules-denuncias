"use client"

import {useEffect, useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {type z} from "zod"
import {useForm} from "react-hook-form"
import {ArrowRightIcon, PlusIcon} from "lucide-react"

import {useManageAccountUserModal} from "@/store/use-manage-account-user-modal"
import {ManageAccountUserSchema} from "@/schemas"
import Icon from "@components/icon"
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion"

import {Button} from "../ui/button"

export type ManageAccountUserFormValues = z.infer<typeof ManageAccountUserSchema>

export const ManageAccountUserForm = () => {
  const {data} = useManageAccountUserModal()
  const defaultValues: ManageAccountUserFormValues = {
    name: data?.values.name,
    email: data?.values.email,
    username: data?.values.username,
    accountIds: data?.values.accountIds ?? [],
    image: data?.values.image,
  }

  const form = useForm<ManageAccountUserFormValues>({
    resolver: zodResolver(ManageAccountUserSchema),
    defaultValues,
  })

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (data?.values) {
      form.reset(data?.values)
    }
  }, [data?.values, form])

  if (!isClient) {
    return null
  }

  return (
    <section className="h-full w-full gap-x-4 overflow-y-auto">
      <section className="flex w-full flex-1 flex-col items-start gap-y-5 px-10">
        <div className="flex w-full flex-col gap-y-2">
          <h2 className="text-3xl font-bold">Cuenta</h2>
          <p className="text-sm font-light">Manege la informacion de su cuenta</p>
        </div>

        {/* perfil */}
        <div className="flex w-full flex-col gap-y-5">
          <h4 className="text-lg">Perfil</h4>
          <Button className="group flex w-full justify-between border-none pl-5" variant="outline">
            <div className="flex items-center gap-x-3">
              <div className="h-8 w-8 rounded-full border">
                <img alt="" className="h-full w-full rounded-full" src={data?.values.image || ""} />
              </div>
              <span className="text-sm font-light">{data?.values.name || data?.values.email}</span>
            </div>
            <ArrowRightIcon className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
          </Button>
        </div>

        {/* Cuentas conectaadas */}
        <div className="flex w-full flex-col gap-y-2">
          <h4 className="text-lg">Cuentas conectadas</h4>
          <Accordion collapsible className="w-full" type="single">
            {data.accounts.map((account) => (
              <AccordionItem key={account.id} value={account.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-x-3">
                    {account.provider === "google" ? (
                      <Icon className="h-4 w-4" name="chrome" />
                    ) : (
                      <Icon className="h-4 w-4" name="github" />
                    )}

                    <span>
                      {account.provider} (
                      {data.values.username || data.values.name || data.values.email})
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-3 pl-10">
                    <div className="flex items-center gap-x-3">
                      <div className="h-8 w-8 rounded-full">
                        <img
                          alt=""
                          className="h-full w-full rounded-full"
                          src={data.values.image || "https://i.pravatar.cc"}
                        />
                      </div>
                      <span className="text-sm font-light">
                        {data.values.name || data.values.email}
                      </span>
                    </div>
                    <div className="flex flex-col items-start gap-y-3">
                      <h4>Remove</h4>
                      <p>Remove this connected account from your account</p>
                      <Button
                        className="p-0 text-destructive"
                        type="button"
                        variant="link"
                        onClick={() => {
                          console.log("remover cuenta")
                        }}
                      >
                        Remove connected account
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Button
          className="flex w-full items-center justify-between transition hover:bg-blue-500/70"
          variant="outline"
          onClick={() => {
            console.log("conectar cuenta")
          }}
        >
          <div className="flex items-center gap-x-3">
            <PlusIcon className="h-4 w-4" /> Connect account
          </div>
          <ArrowRightIcon className="h-4 w-4" />
        </Button>

        {/* danger  */}
        <div className="mt-auto flex w-full flex-col gap-y-2">
          <h4 className="text-lg">Danger</h4>
          <div className="flex items-center justify-between pl-10">
            <div className="flex flex-col items-start gap-y-3">
              <h5 className="text-lg">Delete account</h5>
              <p className="text-sm font-light">Delete your account and all its associated data</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                console.log("Eliminar cuenta")
              }}
            >
              Eliminar cuenta
            </Button>
          </div>
        </div>
      </section>
    </section>
  )
}
