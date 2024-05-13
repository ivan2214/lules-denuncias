"use client"
import Link from "next/link"
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {Suspense} from "react"
import {type Category} from "@prisma/client"

import {cn, createUrl} from "@/lib/utils"
import {SearchBar} from "@components/search-bar"
import SearchBarFallback from "@components/fallbacks/search-bar-fallback"
import AuthButtons from "@/components/auth-options"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import MenuUser, {type ExtendsUser} from "@components/menu-user"
import {ButtonOpenModal} from "@components/button-open-modal"
import ModeToggle from "@components/mode-toggle"

const filterOptions = [
  {
    name: "Nuevos",
    value: "new",
  },
  {
    name: "Gratis",
    value: "free",
  },

  {
    name: "Todos",
    value: "all",
  },
  {
    name: "Recomendados",
    value: "recommended",
  },
  {
    name: "Destacados",
    value: "featured",
  },
  {
    name: "Mas vendidos",
    value: "most_sold",
  },
]

const sortOptions = [
  {
    name: "Mas recientes",
    value: "most_recent",
  },
  {
    name: "Mas antiguos",
    value: "most_ancient",
  },
  {
    name: "De mas popular a menos",
    value: "most_popular",
  },
]

export function Menu({categories, user}: {categories?: Category[]; user?: ExtendsUser | null}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedCategories = searchParams.get("categories")?.split(",") ?? []
  const selectedSortValues = searchParams.get("sort")?.split(",")
  const selectedFilterValues = searchParams.get("filter")
  const router = useRouter()

  const handleCategoryClick = (categoryValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString())
    const updatedCategories = [...selectedCategories]
    const categoryIndex = updatedCategories.indexOf(categoryValue)

    if (categoryIndex === -1) {
      updatedCategories.push(categoryValue)
    } else {
      updatedCategories.splice(categoryIndex, 1)
    }

    if (updatedCategories.length > 0) {
      newParams.set("categories", updatedCategories.map((category) => category).join(","))
    } else {
      newParams.delete("categories")
    }

    const includesOfferPage = pathname?.includes("complaints")
    const pathNameDefined = !includesOfferPage ? `/complaints${pathname}` : pathname

    router.push(createUrl(pathNameDefined, newParams))
    router.refresh()
  }

  const handleSortClick = (sortValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString())

    newParams.set("sort", sortValue)
    const includesOfferPage = pathname?.includes("complaints")
    const pathNameDefined = !includesOfferPage ? `/complaints${pathname}` : pathname

    router.push(createUrl(pathNameDefined, newParams))
    router.refresh()
  }

  const handleFilterClick = (filterValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString())

    newParams.set("filter", filterValue)
    const includesOfferPage = pathname?.includes("complaints")
    const pathNameDefined = !includesOfferPage ? `/complaints${pathname}` : pathname

    router.push(createUrl(pathNameDefined, newParams))
    router.refresh()
  }

  return (
    <Menubar className="container flex w-full items-center justify-between rounded-none border-b border-none px-2 py-8 lg:px-4">
      <div className="flex items-center gap-2">
        <Link className="font-bold" href="/">
          Inicio
        </Link>
        <MenubarMenu>
          <MenubarTrigger className="font-bold">Quejas</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/complaints">Quejas</Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Filters</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                {filterOptions.map((filter) => (
                  <MenubarItem
                    key={filter.value}
                    className={cn(
                      "text-sm transition-colors duration-300 hover:underline",
                      selectedFilterValues?.includes(filter.value) &&
                        "underline decoration-primary underline-offset-4",
                    )}
                    onClick={() => {
                      handleFilterClick(filter.value)
                    }}
                  >
                    {filter.name}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Sort</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                {sortOptions.map((sort) => (
                  <MenubarItem
                    key={sort.value}
                    className={cn(
                      "text-sm transition-colors duration-300 hover:underline",
                      selectedSortValues?.includes(sort.value) &&
                        "underline decoration-primary underline-offset-4",
                    )}
                    onClick={() => {
                      handleSortClick(sort.value)
                    }}
                  >
                    {sort.name}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Categories</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                {categories?.map((category) => (
                  <MenubarItem
                    key={category.id}
                    className={cn(
                      "text-sm transition-colors duration-300 hover:underline",
                      selectedCategories.includes(category.name) &&
                        "underline decoration-primary underline-offset-4",
                    )}
                    onClick={() => {
                      handleCategoryClick(category.name)
                    }}
                  >
                    {category.name}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </div>
      <section className="hidden items-center gap-2 md:flex">
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
        {!user && <AuthButtons />}
        {user ? <MenuUser user={user} /> : null}
        <ButtonOpenModal />
        <ModeToggle />
      </section>
    </Menubar>
  )
}
