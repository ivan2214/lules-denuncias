"use client";

import {type Category} from "@prisma/client";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

import {cn, createUrl} from "@/lib/utils";

interface SideBarItemProps {
  category: Category;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({category}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("categories")?.split(",").includes(category.name);
  const activeParams =
    searchParams.get("categories") === null ||
    searchParams.get("categories") === "" ||
    searchParams.get("categories") === undefined
      ? false
      : true;
  const selectedCategories = searchParams.get("categories")?.split(",") ?? [];
  const searchParmsActive = searchParams.get("categories");
  const newParams = new URLSearchParams(searchParams.toString());

  if (!activeParams) {
    newParams.delete("categories");
  }

  if (!active) {
    const newCategories = [...selectedCategories, category.name];

    newParams.set("categories", newCategories.join(","));
  } else {
    const cleanedCategories = selectedCategories.filter((c) => c !== category.name);

    if (cleanedCategories.length === 0) {
      newParams.delete("categories");
    }

    if (cleanedCategories.length > 0) {
      newParams.set("categories", cleanedCategories.join(","));
    }
  }

  return (
    <Link
      className={cn(
        "block capitalize transition-colors duration-300 hover:underline",
        selectedCategories.includes(category.name) &&
          "underline decoration-primary underline-offset-4",
      )}
      href={createUrl(pathname, newParams)}
      prefetch={!active ? false : undefined}
    >
      {category.name}
    </Link>
  );
};
