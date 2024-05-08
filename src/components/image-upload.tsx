import {useDropzone} from "react-dropzone";
import {Trash} from "lucide-react";

import {Button} from "@/components/ui/button";

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({onChange, onRemove, value}) => {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const res = await fetch("/api/cloudinary", {
          method: "POST",
          body: JSON.stringify({image: {data: reader.result as string}}),
        });

        const data: {url: string} = await res.json();

        console.log(data);

        onChange(data.url);
      } catch (error) {
        console.log(error);
      }
    };
    reader.readAsDataURL(file);
  };

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {value?.map((url) => (
          <div key={url} className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
            <div className="absolute right-2 top-2 z-10">
              <Button
                size="sm"
                type="button"
                variant="destructive"
                onClick={() => {
                  onRemove(url);
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img alt="Description" className="object-cover" loading="lazy" src={url} />
          </div>
        ))}
      </div>
      <div {...getRootProps()}>
        <label className="block text-sm font-medium text-gray-700" htmlFor="file-upload">
          Product Image
        </label>
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
          <div className="space-y-1 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                className="rounded- relative cursor-pointer font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary"
                htmlFor="file-upload"
              >
                <span>Upload a file</span>
                <input
                  {...getInputProps()}
                  className="sr-only"
                  id="file-upload"
                  name="file-upload"
                  type="file"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
