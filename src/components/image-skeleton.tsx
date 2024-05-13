"use client"

import {useState, useEffect, useRef, type HTMLAttributes} from "react"

import {cn} from "@/lib/utils"

interface ImageSkeletonProps {
  src: string
  alt?: string
  className?: HTMLAttributes<HTMLDivElement>["className"]
  classNameDiv?: HTMLAttributes<HTMLDivElement>["className"]
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  src,
  alt = "",
  className = "",
  classNameDiv,
}) => {
  const [loading, setLoading] = useState(true)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!src) return

    const image = new Image()

    image.src = src

    const onLoad = () => {
      setLoading(false)
    }

    const onError = () => {
      setLoading(false)
      // Manejar el error de carga de la imagen
    }

    image.addEventListener("load", onLoad)
    image.addEventListener("error", onError)

    return () => {
      image.removeEventListener("load", onLoad)
      image.removeEventListener("error", onError)
    }
  }, [src])

  return (
    <div className={cn(classNameDiv)}>
      {loading ? (
        <div className={cn("animate-pulse rounded-lg bg-gray-300  dark:bg-gray-700", className)} />
      ) : null}
      <img
        ref={imageRef}
        alt={alt}
        className={cn(loading ? "hidden" : "block", className)}
        loading="lazy"
        src={src}
      />
    </div>
  )
}

export default ImageSkeleton
