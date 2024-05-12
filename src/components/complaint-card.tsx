import Link from "next/link";
import {FlagIcon, MapPinIcon} from "lucide-react";
import {StatusComplaint} from "@prisma/client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {type ComplaintExtends} from "@/actions/complaints/get-filtered-complaints";

import ImageSkeleton from "./image-skeleton";
import {ArrowPrioriry} from "./arrow-priority";

interface ComplaintCardProps {
  complaint: ComplaintExtends;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({complaint}) => {
  const creatorName = (user: ComplaintExtends["user"]) => {
    if (user) {
      return user.name || user.username || "Anónimo";
    }

    return "Anónimo";
  };

  if (!complaint.images.length) {
    return (
      <Card key={complaint.id} className="relative h-fit">
        <CardHeader>
          <CardTitle className="capitalize">{complaint.title || "Pothole Complaint"}</CardTitle>
          <CardDescription>
            Repordado por {creatorName(complaint.user)} el{" "}
            {new Date(complaint.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <section className="flex">
          <CardContent>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">{complaint.address}</span>
            </div>
            <p className="mt-2 max-w-prose text-sm text-gray-500">{complaint.description}</p>
          </CardContent>
        </section>
        <CardFooter className="mt-auto flex flex-col items-start gap-y-5 ">
          <div className="flex items-center gap-2">
            <FlagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium">Prioridad:</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {complaint.priority === 0 ? "Baja" : complaint.priority === 1 ? "Media" : "Alta"}
            </span>
          </div>
          <section className="flex flex-wrap gap-2">
            {complaint.categories.map((category) => (
              <Badge key={category.Category.id} className="text-xs" variant="secondary">
                {category.Category.name}
              </Badge>
            ))}
          </section>
        </CardFooter>
        <CardFooter>
          <div className="flex items-center justify-between gap-x-2">
            <Badge
              className={cn(
                "text-primary-foreground dark:text-secondary-foreground",
                complaint.isResolved
                  ? "bg-green-500"
                  : complaint.status === StatusComplaint.IN_PROGRESS ||
                      complaint.status === StatusComplaint.OPEN
                    ? "bg-yellow-500"
                    : "bg-red-500",
              )}
              variant="secondary"
            >
              {complaint.status}
            </Badge>
            <Link
              className="text-sm text-gray-500 hover:underline"
              href={`/complaint/${complaint.id.toString()}`}
            >
              Ver detalles
            </Link>
          </div>
        </CardFooter>
        <div className="absolute right-2 top-2 ">
          <ArrowPrioriry
            priority={
              complaint.priority === 0 ? "Baja" : complaint.priority === 1 ? "Media" : "Alta"
            }
          />
        </div>
      </Card>
    );
  }

  return (
    <Card
      key={complaint.id}
      className="relative flex h-full flex-col overflow-hidden transition hover:scale-105 lg:flex-row"
    >
      <picture className="h-full w-full lg:w-1/2">
        <ImageSkeleton
          alt={complaint.title}
          className="aspect-video h-full w-full object-cover object-center"
          classNameDiv="h-full w-full"
          src={complaint.images[0]?.url ?? "https://via.placeholder.com/600x400"}
        />
      </picture>
      <section className="flex h-full w-full flex-col items-start justify-between">
        <CardHeader>
          <CardTitle className="capitalize">{complaint.title || "Pothole Complaint"}</CardTitle>
          <CardDescription>
            Repordado por {creatorName(complaint.user)} el{" "}
            {new Date(complaint.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-500">{complaint.address}</span>
          </div>
          <p className="mt-2 text-gray-500">
            {complaint.description ||
              "There is a large pothole on the corner that is causing damage to vehicles. Please fix it as soon as possible."}
          </p>
        </CardContent>
        <CardFooter className="mt-auto flex flex-col items-start gap-y-5 ">
          <div className="flex items-center gap-2">
            <FlagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium">Prioridad:</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {complaint.priority === 0 ? "Baja" : complaint.priority === 1 ? "Media" : "Alta"}
            </span>
          </div>
          <section className="flex flex-wrap gap-2">
            {complaint.categories.map((category) => (
              <Badge key={category.Category.name} className="text-xs" variant="secondary">
                {category.Category.name}
              </Badge>
            ))}
          </section>
        </CardFooter>
        <CardFooter>
          <div className="flex items-center justify-between gap-x-2">
            <Badge
              className={cn(
                "text-primary-foreground dark:text-secondary-foreground",
                complaint.isResolved
                  ? "bg-green-500"
                  : complaint.status === StatusComplaint.IN_PROGRESS ||
                      complaint.status === StatusComplaint.OPEN
                    ? "bg-yellow-500"
                    : "bg-red-500",
              )}
              variant="secondary"
            >
              {complaint.status}
            </Badge>
            <Link
              className="text-sm text-gray-500 hover:underline"
              href={`/complaint/${complaint.id.toString()}`}
            >
              Ver detalles
            </Link>
          </div>
        </CardFooter>
      </section>
      <div className="absolute right-2 top-2 ">
        <ArrowPrioriry
          priority={complaint.priority === 0 ? "Baja" : complaint.priority === 1 ? "Media" : "Alta"}
        />
      </div>
    </Card>
  );
};
