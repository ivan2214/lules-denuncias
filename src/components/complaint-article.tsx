"use client";
import Link from "next/link";

import {cn} from "@/lib/utils";
import ImageSkeleton from "@/components/image-skeleton";
import {type ComplaintExtends} from "@/actions/complaints/get-filtered-complaints";

import {Badge} from "./ui/badge";

interface ComplaintArticleProps extends React.HTMLAttributes<HTMLDivElement> {
  complaint: ComplaintExtends;
  aspectRatio?: "portrait" | "square";
  userId?: string;
}

export function ComplaintArticle({
  complaint,
  aspectRatio = "portrait",
  className,
  userId,
}: ComplaintArticleProps) {
  const handleComplaintClick = async (userId?: string) => {
    try {
      await fetch("/api/preferences-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          preferences: complaint.categories.map((category) => category.Category.name),
          favoriteCategories: complaint.categories,
          complaint,
        }),
      });
      console.log("Preferencias actualizadas con éxito.");
    } catch (error) {
      console.log("Error al actualizar las preferencias del usuario:", error);
    }
  };

  return (
    <article className={cn("flex w-full  flex-col justify-between gap-y-5", className)}>
      <Link
        className="h-80  w-full overflow-hidden rounded-md"
        href={`/complaint/${complaint.id}`}
        onClick={async () => {
          await handleComplaintClick(userId);
        }}
      >
        <ImageSkeleton
          alt={complaint.title}
          className={cn(
            "h-80 w-full object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
          )}
          src={complaint?.images[0]?.url || "https://picsum.photos/200"}
        />
      </Link>
      <div className="space-y-1 text-sm">
        <h3 className="truncate font-medium leading-none tracking-tight">{complaint.title}</h3>
        <p className="text-xs text-muted-foreground">
          {complaint.categories.map((category) => category.Category.name).join(", ")}
        </p>
        <Badge className="bg-purple-500 text-white" variant="outline">
          {complaint.status}
        </Badge>
      </div>
    </article>
  );
}
