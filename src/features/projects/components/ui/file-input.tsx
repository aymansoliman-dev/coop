import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemMetadata,
  FileUploadItemDelete,
} from "@/shared/components/ui/file-upload"
import { Button } from "@/shared/components/ui/button"
import { CameraIcon, ImageIcon, UploadIcon, User2Icon, XIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { ImageFrameIcon } from "@/assets/icons"

export function FileInput({ name }: { name: string }) {
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return

    const transfer = new DataTransfer()
    files.forEach((file) => transfer.items.add(file))
    inputRef.current.files = transfer.files
  }, [files])

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <FileUpload
            maxFiles={1}
            replaceOnSelect
            maxSize={5 * 1024 * 1024}
            accept="image/jpeg,image/jpg,image/png,image/avif,image/svg+xml,image/gif"        
            className="h-10 w-10! hover:grayscale-100! transition-all duration-500"
            value={files}
            onValueChange={setFiles}
          >
              <FileUploadDropzone className={`w-full flex flex-row cursor-pointer p-0 ${files.length === 1 || name==="logo"? 'border-none': ''}`}>
                <Image
                  src="https://avatar.vercel.sh/shadcn1"
                  alt="Photo"
                  fill
                  className="object-cover grayscale dark:brightness-20 block"
                />
                <div className={`flex items-center justify-center z-10 w-full h-full bg-card ${files.length === 1 ? 'opacity-0 hover:opacity-60 transition-all duration-500': ''}`}>
                    <ImageFrameIcon />
                </div>
                <FileUploadList className="absolute inset-0 h-full">
                  {files.map((file) => (
                    <FileUploadItem key={file.name} value={file} className="p-0 h-full w-full border-none">
                      <FileUploadItemPreview className="size-24 [&>svg]:size-12 h-full w-full border-none p-2" />
                      <FileUploadItemDelete className="absolute -top-2 -left-2 z-10 h-fit p-0 border border-accent bg-foreground text-accent" onClick={(e) => e.stopPropagation()} render={<XIcon size={18} />} />
                    </FileUploadItem>
                  ))}
                </FileUploadList>
              </FileUploadDropzone>
          </FileUpload>

          <input
            ref={inputRef}
            type="file"
            name={name}
            accept="image/*"
            className="hidden"
            tabIndex={-1}
            aria-hidden="true"
          />
        </TooltipTrigger>
        <TooltipContent className={`${files.length === 1 ? 'hidden' : ''}`}>{name.charAt(0).toUpperCase().concat(name.slice(1))}</TooltipContent>
      </Tooltip>
    </>
  )
}