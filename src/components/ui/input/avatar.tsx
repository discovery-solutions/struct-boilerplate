"use client";
import { Avatar as BaseAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConfirmDialog, fetcher } from "@discovery-solutions/struct/client";
import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AvatarUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  url?: string;
  initials?: string;
  className?: string;
  avatarClassName?: string;
  uploadUrl?: string;
  deleteUrl?: string;
  folder?: string;
  value?: string;
}

export const AvatarUpload = ({
  uploadUrl = "/api/file",
  deleteUrl = "/api/file",
  folder = "avatars",
  avatarClassName,
  className,
  disabled,
  initials,
  value,
  name,
  url,
  ...props
}: AvatarUploadProps) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>(value || url || "");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onClick = () => {
    if (!disabled && !uploading) document.getElementById(`avatar-upload-${name}`)?.click();
  };

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const { url } = await fetcher(uploadUrl, {
        method: "POST",
        body: formData,
      });

      setUploading(false);
      setPreview(url);
      props.onChange?.({
        target: {
          name,
          value: url,
        },
      } as any);
    } catch (error) {
      onFileError(error);
    }
  };

  const onFileError = (error: any) => {
    console.error("Avatar upload failed", error);
    setUploading(false);
    toast.error("Erro ao enviar o arquivo. Tente novamente.");
  };

  const onDelete = async () => {
    setConfirmOpen(false);
    if (!deleteUrl || !preview) return;

    await fetcher(deleteUrl, {
      method: "DELETE",
      body: { url: preview },
    });

    props.onChange?.({
      target: { name, value: "" },
    } as any);

    setPreview("");
  };

  return (
    <>
      <div className={cn("relative cursor-pointer", className)}>
        <div
          className="group w-fit relative"
          onClick={onClick}
          onMouseOver={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          <BaseAvatar className={cn("w-16 h-16", avatarClassName)}>
            <AvatarImage src={preview} alt={initials || ""} className="object-cover object-top" />
            <AvatarFallback>{initials || ""}</AvatarFallback>
          </BaseAvatar>

          {preview && (
            <button
              type="button"
              disabled={disabled || uploading}
              onClick={(e) => {
                e.stopPropagation();
                setConfirmOpen(true);
              }}
              className={`absolute top-0 left-0 bg-red-200 rounded-full w-full h-full flex items-center justify-center ${showDelete ? "opacity-85" : "opacity-0"
                } transition z-10 cursor-pointer`}
            >
              <Trash color="red" />
            </button>
          )}
        </div>

        <input
          {...props}
          id={`avatar-upload-${name}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChangeFile}
          onError={onFileError}
          disabled={disabled || uploading}
        />
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remover avatar"
        description="Deseja realmente remover esta imagem?"
        method="DELETE"
        onPress={onDelete}
      />
    </>
  );
};
