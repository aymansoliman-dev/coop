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
import { UploadIcon, XIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
      <FileUpload
        maxFiles={1}
        maxSize={5 * 1024 * 1024}
        accept="image/jpeg,image/jpg,image/png,image/avif,image/svg+xml,image/gif"        
        className="w-full h-full"
        value={files}
        onValueChange={setFiles}
      >
        {files.length === 0 && (
          <FileUploadDropzone className="w-full flex flex-row cursor-pointer">
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center justify-center border p-2.5">
                <UploadIcon className="size-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">Drag & drop logo here</p>
              <p className="text-xs text-muted-foreground">
                Or click to browse (1 file, max 5MB)
              </p>
            </div>
          </FileUploadDropzone>
        )}

        <FileUploadList>
          {files.map((file) => (
            <FileUploadItem key={file.name} value={file}>
              <FileUploadItemPreview className="size-24 [&>svg]:size-12" />
              <FileUploadItemMetadata />
              <FileUploadItemDelete
                render={
                  <Button variant="ghost" size="icon" className="size-7">
                    <XIcon />
                  </Button>
                }
              />
            </FileUploadItem>
          ))}
        </FileUploadList>
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
    </>
  )
}