"use client";
import Link from "next/link";
import {LocateIcon, ThumbsUpIcon} from "lucide-react";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@ui/card";
import {cn} from "@/lib/utils";
import ImageSkeleton from "@/components/image-skeleton";
import {type ComplaintExtends} from "@/actions/complaints/get-filtered-complaints";

import {Badge} from "./ui/badge";
import {creatorName} from "./complaint-card";
import {Button} from "./ui/button";

interface ComplaintArticleProps extends React.HTMLAttributes<HTMLDivElement> {
  complaint: ComplaintExtends;
  aspectRatio?: "portrait" | "square";
}

export function ComplaintArticle({
  complaint,
  aspectRatio = "portrait",
  className,
}: ComplaintArticleProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-950",
        complaint.images.length ? "flex h-full flex-col justify-between" : "h-fit",
      )}
    >
      {complaint.images.length > 0 && (
        <div className="">
          <ImageSkeleton
            alt={complaint.title}
            className="h-48 w-full object-cover"
            src={complaint?.images[0]?.url}
          />
        </div>
      )}
      <div
        className={cn(
          "absolute rounded-md px-2 py-1 text-xs font-medium text-white",
          complaint.status === "RESOLVED"
            ? "bg-green-500"
            : complaint.status === "PENDING"
              ? "bg-yellow-500"
              : "bg-red-500",
          complaint.images.length ? "left-2 top-2" : "right-2 top-2",
        )}
      >
        {complaint.status}
      </div>
      <div className="flex flex-col items-start justify-between gap-y-5 p-4">
        <h3 className="mb-2 text-lg font-semibold">{complaint.title}</h3>
        <p className="mb-4 text-gray-500 dark:text-gray-400">{complaint.description}</p>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-2">
            <LocateIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium">Ubicación:</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{complaint.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUpIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium">Votos:</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {complaint.votes.length} {complaint.votes.length === 1 ? "voto" : "votos"}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 overflow-hidden md:grid-cols-2">
            {complaint.categories.map((category) => (
              <Badge key={category.Category.id}>{category.Category.name}</Badge>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <img
              alt="Author Avatar"
              className="mr-2 rounded-full"
              height={24}
              src={complaint.user?.image ?? "https://github.com/shadcn.png"}
              style={{
                aspectRatio: "24/24",
                objectFit: "cover",
              }}
              width={24}
            />
            <span>{creatorName(complaint.user)}</span>
          </div>
          <Link href={`/complaint/${complaint.id}`}>
            <Button variant="link">Ver más</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
