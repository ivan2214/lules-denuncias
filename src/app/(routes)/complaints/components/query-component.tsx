"use client"
import {Loader2Icon, TrashIcon} from "lucide-react"
import {usePathname, useRouter} from "next/navigation"
import {useState} from "react"

import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {type QueryProps} from "@/actions/complaints/get-filtered-complaints"

interface QueryComponentProps {
  searchParams?: QueryProps
}

export const QueryComponent: React.FC<QueryComponentProps> = ({searchParams}) => {
  const [isLoading, setIsLoading] = useState(false)
  const {categories, keyword, status} = searchParams ?? {}
  const router = useRouter()
  const pathname = usePathname()
  let categoriesArray = categories?.split(",")

  const removeQuery = ({
    param,
    value,
  }: {
    param:
      | "categories"
      | "minPriority"
      | "maxPriority"
      | "latitude"
      | "longitude"
      | "keyword"
      | "sortBy"
      | "sortOrder"
      | "status"
    value?: string
  }) => {
    setIsLoading(true)
    const params = {...searchParams}

    if (param === "keyword") {
      delete params.keyword
    }

    if (param === "minPriority") {
      delete params.minPriority
    }

    if (param === "maxPriority") {
      delete params.maxPriority
    }

    if (param === "latitude") {
      delete params.latitude
    }

    if (param === "longitude") {
      delete params.longitude
    }

    if (param === "sortBy") {
      delete params.sortBy
    }

    if (param === "sortOrder") {
      delete params.sortOrder
    }

    if (param === "categories" && value) {
      const updatedCategories = categories
        ?.split(",")
        .filter((cat) => cat !== value)
        .join(",")

      if (updatedCategories) {
        params.categories = updatedCategories
      } else {
        delete params.categories
      }
    }

    const queryParams = new URLSearchParams(params).toString()
    const url = `${pathname}?${queryParams}`

    router.push(url)
    router.refresh()

    setIsLoading(false)
  }

  const clearAll = () => {
    setIsLoading(true)
    categoriesArray = []
    router.push(pathname)
    router.refresh()
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
      <div className="mt-4 flex w-full flex-wrap gap-2">
        {categories
          ? categoriesArray?.map((category) => (
              <Badge
                key={category}
                className="flex items-center justify-between capitalize"
                variant="outline"
              >
                {category}
                <Button
                  disabled={isLoading}
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    removeQuery({
                      param: "categories",
                      value: category,
                    })
                  }}
                >
                  <TrashIcon className="h-4 w-4 text-destructive" />
                </Button>
              </Badge>
            ))
          : null}
        {status ? (
          <Badge className="flex items-center justify-between capitalize" variant="outline">
            {status}
            <Button
              disabled={isLoading}
              size="icon"
              variant="ghost"
              onClick={() => {
                removeQuery({
                  param: "status",
                  value: status,
                })
              }}
            >
              <TrashIcon className="h-4 w-4 text-destructive" />
            </Button>
          </Badge>
        ) : null}
        {keyword ? (
          <Badge className="flex items-center justify-between capitalize" variant="outline">
            {keyword}
            <Button
              disabled={isLoading}
              size="icon"
              variant="ghost"
              onClick={() => {
                removeQuery({
                  param: "keyword",
                  value: keyword,
                })
              }}
            >
              <TrashIcon className="h-4 w-4 text-destructive" />
            </Button>
          </Badge>
        ) : null}
      </div>
      <Button
        className="flex w-fit items-center gap-2 "
        disabled={isLoading}
        variant="destructive"
        onClick={clearAll}
      >
        {isLoading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : null}
        {!isLoading ? "Borrar todos" : "Borrando..."}
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
