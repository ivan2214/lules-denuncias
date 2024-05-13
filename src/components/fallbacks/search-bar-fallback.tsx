import {cn} from "@/lib/utils"

const skeleton = "bg-gray-200 animate-pulse rounded-lg"

const SearchBarFallback = () => {
  return (
    <div className="flex w-1/4 animate-pulse items-center justify-start gap-4 rounded-lg border border-gray-200 px-4 py-3">
      <div className={cn(skeleton, "h-5 w-5")} />
      <div className={cn(skeleton, "h-5 w-full")} />
    </div>
  )
}

export default SearchBarFallback
