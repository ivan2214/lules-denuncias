"use client";

import type * as z from "zod";

import {useState, useTransition} from "react";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {DialogFooter} from "@/components/ui/dialog";
import {ChangeStatusSchema} from "@/schemas";
import {useChangeStatusModal} from "@/store/use-change-status-modal";

export type ChangeStatusFormValues = z.infer<typeof ChangeStatusSchema>;

const statuses = [
  StatusComplaint.CLOSED,
  StatusComplaint.IN_PROGRESS,
  StatusComplaint.OPEN,
  StatusComplaint.PENDING,
  StatusComplaint.RESOLVED,
  StatusComplaint.UNRESOLVED,
];

export const ChangeStatusSchemaForm = () => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusComplaint | null>(null);

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className="w-[150px] justify-start" variant="outline">
              {selectedStatus ? <>{selectedStatus}</> : <>+ Set status</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-0" side="bottom">
            <Command>
              <CommandInput placeholder="Change status..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status}
                      value={status}
                      onSelect={(value) => {
                        setSelectedStatus(statuses.find((status) => status === value) || null);
                        setOpen(false);
                      }}
                    >
                      {status}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
