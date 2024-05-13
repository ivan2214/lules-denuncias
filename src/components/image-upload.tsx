"use client"
import {useState} from "react"
import {useDropzone} from "react-dropzone"
import {Image, Loader, Trash} from "lucide-react"
import {toast} from "sonner"

import {Button} from "./ui/button"

interface ImageUploadProps {
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value?: string[]
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const ImageUpload: React.FC<ImageUploadProps> = ({onChange, onRemove, value}) => {
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = (acceptedFiles: File[]) => {
    setIsUploading(true)
    const file = acceptedFiles[0]

    if (file.size > MAX_FILE_SIZE) {
      setIsUploading(false)

      return toast("Error", {
        description: "La imagen supera el tamaño máximo permitido (10MB)",
      })
    }

    const reader = new FileReader()

    reader.onload = async () => {
      try {
        const res = await fetch("/api/cloudinary", {
          method: "POST",
          body: JSON.stringify({image: {data: reader.result as string}}),
        })
        const data: {url: string} = await res.json()

        onChange(data.url)
      } catch (error) {
        console.log(error)
      } finally {
        setIsUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <section className="flex flex-col items-center gap-y-10">
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {value?.map((url) => (
          <div key={url} className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
            <div className="absolute right-2 top-2 z-10">
              <Button
                size="sm"
                type="button"
                variant="destructive"
                onClick={() => {
                  onRemove(url)
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img alt="Description" className="object-cover" loading="lazy" src={url} />
          </div>
        ))}
        {isUploading ? (
          <div className="flex h-[200px] w-[200px] items-center justify-center rounded-md border">
            <Loader className="animate-spin" />
          </div>
        ) : null}
      </div>
      <div className="w-full" {...getRootProps()}>
        <label className="block text-sm font-medium text-gray-700" htmlFor="file-upload">
          Cargar imagen
        </label>
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
          <div className="flex flex-col items-center gap-y-1 space-y-1 text-center">
            <Image />
            <div className="flex text-sm text-gray-600">
              <label
                className="rounded- relative cursor-pointer font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary"
                htmlFor="file-upload"
              >
                <span>Suba una imagen</span>
                <input
                  {...getInputProps()}
                  className="sr-only"
                  id="file-upload"
                  name="file-upload"
                  type="file"
                />
              </label>
              <p className="pl-1">o arrastra y suelta</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageUpload
