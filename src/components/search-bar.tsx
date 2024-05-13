"use client"

import {SearchIcon} from "lucide-react"
import {usePathname, useRouter, useSearchParams} from "next/navigation"

import {Input} from "@/components/ui/input"
import {createUrl} from "@/lib/utils"

export const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set("keyword", search.value)
    } else {
      newParams.delete("keyword")
    }
    const includesOfferPage = pathname?.includes("complaints")
    const pathNameDefined = !includesOfferPage ? `/complaints${pathname}` : pathname

    router.push(createUrl(pathNameDefined, newParams))
    router.refresh()
  }

  return (
    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form onSubmit={onSubmit}>
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            key={searchParams?.get("search")}
            autoComplete="off"
            className="pl-8"
            defaultValue={searchParams?.get("keyword") ?? ""}
            name="search"
            placeholder="Buscar productos..."
            type="search"
          />
        </div>
      </form>
    </div>
  )
}
