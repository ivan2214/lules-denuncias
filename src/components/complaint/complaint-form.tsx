"use client";

import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useEffect, useState, useTransition} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {type z} from "zod";
import {useFieldArray, useForm} from "react-hook-form";
import {Loader} from "lucide-react";

import {DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useCreateComplaimentModal} from "@/store/use-create-complaint-modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {CreateComplainSchema} from "@/schemas";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {createComplaint} from "@/actions/server-actions/create-complaiment";

import {Textarea} from "../ui/textarea";
import ImageUpload from "../image-upload";

export type CreateComplaimentFormValues = z.infer<typeof CreateComplainSchema>;

export const ComplaintForm = () => {
  const {close, data} = useCreateComplaimentModal();
  const [isPending, startTransition] = useTransition();
  const defaultValues: CreateComplaimentFormValues = {
    title: data?.values?.title ?? "",
    description: data?.values?.description ?? "",
    categoriesNames: data?.values?.categoriesNames ?? [],
    images: data?.values?.images ?? [],
    latitude: data?.values?.latitude ?? 0,
    longitude: data?.values?.longitude ?? 0,
    address: data?.values?.address ?? "",
    city: data?.values?.city ?? "",
    country: data?.values?.country ?? "",
  };

  const form = useForm<CreateComplaimentFormValues>({
    resolver: zodResolver(CreateComplainSchema),
    defaultValues,
    mode: "onChange",
  });
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    name: "categoriesNames",
    control: form.control,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (data?.values) {
      form.reset(data?.values as CreateComplaimentFormValues);
    }
  }, [data?.values, form]);

  if (!isClient) {
    return null;
  }

  function onSubmit(values: CreateComplaimentFormValues) {
    startTransition(() => {
      createComplaint(values).then((res) => {
        if (res.error) {
          toast("Error", {
            description: "Error al crear la queja",
            action: {
              label: "Reintentar",
              onClick: () => {
                onSubmit(values);
              },
            },
          });
        }

        if (res.success) {
          toast("Success", {
            description: "Queja creada correctamente",
          });
          close();
          router.refresh();
        }
      });
    });
  }

  const categories = form.watch("categoriesNames") as {name: string}[];

  console.log({
    ...form.getValues(),
  });

  return (
    <Form {...form}>
      <form className="flex h-full w-full flex-col gap-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid w-full grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({field}) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="latitude"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Latitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Longitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        {/* Categories */}
        <section>
          {categoryFields?.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`categoriesNames.${index}.name`}
              render={({field}) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>Categories</FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <section className="flex items-center gap-2">
            <Button
              className="mt-2"
              size="sm"
              type="button"
              onClick={() => appendCategory({name: ""})}
            >
              Add category
            </Button>

            {categories.length > 0 && (
              <Button
                className="mt-2"
                size="sm"
                type="button"
                variant="destructive"
                onClick={() => removeCategory(categories.length - 1)}
              >
                Remove category
              </Button>
            )}
          </section>
        </section>

        {/* Images */}
        <section>
          <FormField
            control={form.control}
            name="images"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>Imagenes</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value?.map((image) => image?.url)}
                      onChange={(url) => {
                        if (!field?.value) return;
                        field.onChange([...field?.value, {url}]);
                      }}
                      onRemove={(url) => {
                        if (!field?.value) return;
                        field.onChange([...field?.value.filter((current) => current?.url !== url)]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </section>

        <DialogFooter>
          <Button type="reset" variant="destructive">
            Cancelar
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isPending ? "Creando..." : "Crear"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
