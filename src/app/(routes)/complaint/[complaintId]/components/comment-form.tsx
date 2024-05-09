"use client";

import type * as z from "zod";

import {PlusIcon} from "lucide-react";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {CreateCommentSchema} from "@/schemas";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {createComment} from "@/actions/server-actions/comment/create-comment";

interface CommentFormProps {
  complaintId: number;
}

export type CreateCommentFormValues = z.infer<typeof CreateCommentSchema>;

export const CommentForm: React.FC<CommentFormProps> = ({complaintId}) => {
  const [addComment, setAddComment] = useState(false);
  const [isPending, startTransition] = useTransition();

  const defaultValues: CreateCommentFormValues = {
    text: "",
    authorId: undefined,
    complaintId,
  };

  const form = useForm<CreateCommentFormValues>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues,
  });

  const onSubmit = (values: CreateCommentFormValues) => {
    startTransition(() => {
      createComment(values).then((res) => {
        if (res.error) {
          toast("Error", {
            description: res.error,
          });
        }

        if (res.succes) {
          toast("Comentario creado", {
            description: res.succes,
          });
        }
      });
    });
  };

  return (
    <div className="flex flex-col items-center gap-y-5">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl font-bold">Comentarios</h2>
        <Button
          size="sm"
          variant="outline"
          onClick={() => startTransition(() => setAddComment(!addComment))}
        >
          <PlusIcon className="h-4 w-4" />
          Añadir comentario
        </Button>
      </div>
      {addComment ? (
        <Form {...form}>
          <form
            className="flex w-full justify-between gap-x-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="text"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Escribe tu comentario"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit">
              <PlusIcon className="h-4 w-4" />
              Enviar
            </Button>
          </form>
        </Form>
      ) : null}
    </div>
  );
};
