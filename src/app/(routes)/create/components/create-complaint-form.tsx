"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldArray, useForm} from "react-hook-form";
import {type z} from "zod";
import {type Category} from "@prisma/client";

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
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";

interface CreateComplaintFormProps {
  userId: number;
  categories: Category[];
}

export const CreateComplaintForm: React.FC<CreateComplaintFormProps> = ({userId, categories}) => {
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
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Report a Complaint</CardTitle>
            <CardDescription>
              Help us improve our city by reporting any issues you encounter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter a brief title for your complaint" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="min-h-[150px]"
                  id="description"
                  placeholder="Provide more details about the issue you're reporting"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="categories">Categories</Label>
                <Select id="categories">
                  <SelectTrigger>
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="images">Images</Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input readOnly id="latitude" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input readOnly id="longitude" />
                </div>
              </div>
              <div className="h-[400px] rounded-lg border" />
            </form>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Submit Complaint</Button>
          </CardFooter>
        </Card>
        <Button className="ml-auto" type="submit">
          Update account
        </Button>
      </form>
    </Form>
  );
};
