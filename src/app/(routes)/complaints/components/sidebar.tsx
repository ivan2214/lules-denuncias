import {type Category} from "@prisma/client";
import Link from "next/link";

import {cn} from "@/lib/utils";
import {ScrollArea} from "@/components/ui/scroll-area";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categories?: Category[];
}

export function Sidebar({className, categories}: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="sticky top-0 space-y-4 py-4">
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">Categories</h2>
          <ScrollArea className="h-[400px] px-1">
            <div className="space-y-1 p-2">
              {categories?.map((category) => (
                <Link
                  key={category.name}
                  className="block rounded-md px-4 py-2 text-sm font-light hover:bg-muted"
                  href={`/complaints?categories=${category.name}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
