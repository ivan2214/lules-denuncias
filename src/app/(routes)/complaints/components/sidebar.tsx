import {type Category} from "@prisma/client"
import {Suspense} from "react"

import {cn} from "@/lib/utils"
import {ScrollArea} from "@/components/ui/scroll-area"

import {SideBarItem} from "./side-bar-item"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categories?: Category[]
}

export function Sidebar({className, categories}: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="sticky top-0 space-y-4 py-4">
        <div className="py-2">
          <h2 className="relative px-4 text-lg font-semibold tracking-tight">Categories</h2>
          <ScrollArea className="h-[600px] px-1">
            <div className="space-y-3 p-2">
              {categories?.map((category) => (
                <Suspense key={category.name}>
                  <SideBarItem category={category} />
                </Suspense>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
