"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {type z} from "zod";
import {useFieldArray, useForm} from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import {Textarea} from "../ui/textarea";

export type CreateComplaimentFormValues = z.infer<typeof CreateComplainSchema>;

const defaultValues: CreateComplaimentFormValues = {
  title: "",
  description: "",
  categoriesNames: [],
  images: [],
  latitude: 0,
  longitude: 0,
  address: "",
  city: "",
  country: "",
};

export const CreateComplaimentModal = () => {
  const form = useForm<CreateComplaimentFormValues>({
    resolver: zodResolver(CreateComplainSchema),
    defaultValues,
    mode: "onChange",
  });
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const {isOpen, close} = useCreateComplaimentModal();

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    name: "categoriesNames",
    control: form.control,
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    name: "images",
    control: form.control,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  function onSubmit(data: CreateComplaimentFormValues) {
    console.log("onSubmit", data);
  }

  const images = form.watch("images") as {url: string}[];
  const categories = form.watch("categoriesNames") as {name: string}[];

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-[calc(100%-5rem)] w-full overflow-y-auto">
        <DialogHeader className="space-y-0">
          <div className="flex flex-col space-y-1.5">
            <DialogTitle>Crear queja</DialogTitle>
            <DialogDescription>Por favor ingresa los datos de la queja</DialogDescription>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex h-full w-full flex-col gap-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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

            <section className="grid w-full grid-cols-1 gap-6">
              <div>
                {imageFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`images.${index}.url`}
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>images</FormLabel>
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
                    onClick={() => appendImage({url: ""})}
                  >
                    Add image
                  </Button>

                  {images.length > 0 ? (
                    <Button
                      className="mt-2"
                      size="sm"
                      type="button"
                      variant="destructive"
                      onClick={() => removeImage(images.length - 1)}
                    >
                      Remove image
                    </Button>
                  ) : null}
                </section>
              </div>

              <div>
                {categoryFields.map((field, index) => (
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
              </div>
            </section>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  router.push("/");
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="outline">
                Crear
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
