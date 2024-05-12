"use client";

import type * as z from "zod";

import {useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {StatusComplaint} from "@prisma/client";
import {LoaderIcon} from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {DialogFooter} from "@/components/ui/dialog";
import {ChangeStatusSchema} from "@/schemas";
import {useChangeStatusModal} from "@/store/use-change-status-modal";

export type ChangeStatusFormValues = z.infer<typeof ChangeStatusSchema>;

export const ChangeStatusSchemaForm = () => {
  const {close, data} = useChangeStatusModal();
  const [isPending, startTransition] = useTransition();

  const defaultValues: ChangeStatusFormValues = {
    status: data?.values.status || StatusComplaint.PENDING,
  };

  const form = useForm<ChangeStatusFormValues>({
    resolver: zodResolver(ChangeStatusSchema),
    defaultValues,
  });

  function onSubmit(values: ChangeStatusFormValues) {}

  const buttonTitle = "Cambiar estado";
  const buttonLoadingTitle = "Cambiando estado...";

  return (
    <Form {...form}>
      <form className="flex h-full w-full flex-col gap-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogFooter>
          <Button disabled={isPending} type="button" variant="outline" onClick={() => close()}>
            Cancelar
          </Button>
          <Button disabled={isPending} type="submit" variant="outline">
            {isPending ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isPending ? buttonLoadingTitle : buttonTitle}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
