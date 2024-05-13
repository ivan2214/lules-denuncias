"use client"

import type * as z from "zod"

import {useTransition} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {StatusComplaint} from "@prisma/client"
import {toast} from "sonner"

import {ChangeStatusSchema} from "@/schemas"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {changeStatus} from "@/actions/server-actions/complaint/change-status"

export type ChangeStatusFormValues = z.infer<typeof ChangeStatusSchema>

const statuses: StatusComplaint[] = [
  StatusComplaint.CLOSED,
  StatusComplaint.IN_PROGRESS,
  StatusComplaint.OPEN,
  StatusComplaint.PENDING,
  StatusComplaint.RESOLVED,
  StatusComplaint.UNRESOLVED,
]

interface ButtonChangeStatusProps {
  complaintId: number
  values: ChangeStatusFormValues
}

export const ButtonChangeStatus: React.FC<ButtonChangeStatusProps> = ({complaintId, values}) => {
  const [isPending, startTransition] = useTransition()

  const defaultValues: ChangeStatusFormValues = {
    complaintId: complaintId,
    status: values.status || "PENDING",
  }

  const form = useForm<ChangeStatusFormValues>({
    resolver: zodResolver(ChangeStatusSchema),
    defaultValues,
  })

  function onSubmit(data: ChangeStatusFormValues) {
    startTransition(() => {
      changeStatus(data).then((res) => {
        if (res?.error) {
          toast("Error", {
            description: res?.error,
          })
        }

        if (res?.success) {
          toast("Status cambiado", {
            description: res?.success,
          })
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({field}) => (
            <FormItem>
              <Select
                defaultValue={field.value}
                onValueChange={(value: StatusComplaint) => {
                  field.onChange(value)

                  form.handleSubmit(onSubmit)()
                }}
              >
                <FormControl>
                  <SelectTrigger className="h-9 rounded-md px-3">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((status) => {
                    return (
                      <SelectItem key={status} disabled={isPending} value={status}>
                        {status}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
