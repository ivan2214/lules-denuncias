"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldArray, useForm} from "react-hook-form";
import {type z} from "zod";

import {Button} from "@/components/ui/button";
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

interface CreateComplaintFormProps {
  userId: number;
}

export const CreateComplaintForm: React.FC<CreateComplaintFormProps> = ({userId}) => {
  const form = useForm<z.infer<typeof CreateComplainSchema>>({
    resolver: zodResolver(CreateComplainSchema),
    defaultValues: {
      userId: userId || 1,
      title: "",
      description: "",
      categories: [],
      images: [],
      latitude: 0,
      longitude: 0,
      address: "",
      city: "",
      country: "",
    },
    mode: "onChange",
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    name: "categories",
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

  function onSubmit(data: z.infer<typeof CreateComplainSchema>) {
    console.log(data);
  }

  console.log({
    ...form.getValues(),
  });

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid w-full grid-cols-1 gap-6 border-b pb-5 lg:grid-cols-2">
          <section className="grid w-full grid-cols-1 gap-6 border-r pr-5 lg:grid-cols-2">
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
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </section>

          <section>
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

                {form.getValues().images.length > 0 && (
                  <Button
                    className="mt-2"
                    size="sm"
                    type="button"
                    variant="destructive"
                    onClick={() => removeImage(form.getValues().images.length - 1)}
                  >
                    Remove image
                  </Button>
                )}
              </section>
            </div>

            <div>
              {categoryFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`categories.${index}.name`}
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

                {form.getValues().categories?.length > 0 && (
                  <Button
                    className="mt-2"
                    size="sm"
                    type="button"
                    variant="destructive"
                    onClick={() => removeCategory(form.getValues().categories.length - 1)}
                  >
                    Remove category
                  </Button>
                )}
              </section>
            </div>
          </section>
        </section>
        <Button className="ml-auto" type="submit">
          Update account
        </Button>
      </form>
    </Form>
  );
};
