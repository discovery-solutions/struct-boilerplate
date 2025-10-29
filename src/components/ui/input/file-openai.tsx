"use client";
import { UploadCloud, Trash2, FileIcon } from "lucide-react";
import { ConfirmDialog, fetcher } from "@discovery-solutions/struct/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn, truncate } from "@/lib/utils";
import Image from "next/image";
import { Loader } from "@/components/loader";
import { toast } from "sonner";

export interface InputFileOpenAIProps {
  value?: { _id: string; name: string; url: string }[] | { _id: string; name: string; url: string } | null;
  name: string;
  uploadUrl?: string;
  deleteUrl?: string;
  folder?: string;
  className?: string;
  multiple?: boolean;
  disabled?: boolean;
  onChange?: (event: any) => void;
}

interface UploadedFile {
  _id: string;
  name: string;
  url: string;
}

export const InputFileOpenAI = ({
  uploadUrl = "/api/file",
  deleteUrl = "/api/file",
  className,
  disabled,
  folder = "general",
  value,
  name,
  multiple = false,
  onChange,
}: InputFileOpenAIProps) => {
  const initialFiles: UploadedFile[] = Array.isArray(value)
    ? value
    : value
      ? [value]
      : [];

  const [files, setFiles] = useState<UploadedFile[]>(initialFiles);
  const [queue, setQueue] = useState<File[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [uploading, setUploading] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<UploadedFile | null>(null);

  const ID = "file-openai-" + name;
  const initialFileCount = useRef(0);
  const uploadedCount = initialFileCount.current - queue.length;
  const totalToUpload = uploadedCount + queue.length;// + (uploading ? 1 : 0);


  const simulateProgressFromFile = (file: File, onUpdate: (v: number) => void) => {
    const UPLOAD_SPEED_KBPS = 500;
    const fileSizeKB = file.size / 1024;
    const totalDuration = (fileSizeKB / UPLOAD_SPEED_KBPS) * 1000;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min(100, (elapsed / totalDuration) * 100);
      onUpdate(Math.round(percent));
      if (percent >= 100) clearInterval(interval);
    }, 100);
    return interval;
  };

  // loop de envio: se houver arquivos na fila e não estiver enviando, pega o primeiro
  const uploadFile = useCallback(async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const key = file.name;
    const interval = simulateProgressFromFile(file, (val) =>
      setProgressMap((prev) => ({ ...prev, [key]: val }))
    );

    try {
      const { url, _id } = await fetcher(uploadUrl, {
        method: "POST",
        body: formData,
      });

      setFiles((prev) => {
        const updated = [...prev, { _id, name: file.name, url }];
        onChange?.({
          target: {
            name,
            value: multiple ? updated.map((f) => f._id) : updated[0]?._id
          },
        });
        return updated;
      });
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setProgressMap((prev) => ({ ...prev, [key]: 0 }));
      }, 400);
      setUploading(false);
      setQueue((prev) => prev.slice(1)); // remove o primeiro e dispara próximo ciclo
    }
  }, [folder, uploadUrl, name, multiple, onChange]);

  useEffect(() => {
    if (uploading || queue.length === 0) return;
    const file = queue[0];
    uploadFile(file);
  }, [queue, uploading, uploadFile]);

  const onClick = () => {
    if (!disabled) document.getElementById(ID)?.click();
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const newFiles = Array.from(e.target.files);

    if (!window?.location?.href?.includes("localhost")) {
      const MAX_SIZE = 4.5 * 1024 * 1024; // 4.5MB
      const oversized = newFiles.find(f => f.size > MAX_SIZE);

      if (oversized)
        return toast.error(`O arquivo "${oversized.name}" ultrapassa o limite de 4.5MB.`);
    }

    initialFileCount.current = newFiles.length;
    setQueue(prev => [...prev, ...newFiles]);
  };

  const onDelete = async () => {
    if (!deleteUrl || !fileToDelete) return;
    try {
      await fetch(`${deleteUrl}/${fileToDelete._id}`, { method: "DELETE" });
      const newFiles = files.filter((f) => f._id !== fileToDelete._id);
      setFiles(newFiles);

      const valueToEmit = multiple ? newFiles.map((f) => f._id) : null;
      onChange?.({ target: { name, value: valueToEmit } });

      setFileToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className={cn("flex gap-4 flex-wrap", className)}>
        {files.map((file) => {
          const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(file.url);
          const progress = progressMap[file.name] || 0;

          return (
            <div
              key={file._id || file.url}
              className="relative w-32 h-32 border rounded-md bg-muted flex items-center justify-center overflow-hidden"
            >
              {isImage ? (
                <Image src={file.url} alt={file.name} fill className="object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 gap-2">
                  <FileIcon className="w-6 h-6 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground text-center break-words px-2">
                    {truncate(file.name, 36)}
                  </p>
                </div>
              )}

              {progress > 0 && progress < 100 && (
                <div className="absolute bottom-0 left-0 h-1.5 bg-muted w-full">
                  <div
                    className="h-full bg-blue-500 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              <button
                type="button"
                disabled={disabled || uploading}
                onClick={() => setFileToDelete(file)}
                className="absolute top-1 right-1 bg-red-200 rounded-md p-1"
              >
                <Trash2 className="text-red-600 w-4 h-4" />
              </button>
            </div>
          );
        })}

        <div
          className="group relative w-full h-40 border rounded-md bg-muted flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={onClick}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            {uploading ? <Loader /> : <UploadCloud className="w-6 h-6 text-muted-foreground" />}
            <p className="text-xs text-muted-foreground">
              {uploading
                ? `Enviando ${uploadedCount + 1} de ${totalToUpload}...`
                : queue.length > 0
                  ? `Aguardando envio (${queue.length} restante${queue.length > 1 ? "s" : ""})`
                  : "Clique para enviar"}
            </p>
          </div>
        </div>

        <input
          key={ID}
          id={ID}
          type="file"
          className="hidden"
          multiple={multiple}
          onChange={onChangeFile}
          disabled={disabled}
          name={name}
        />
      </div>

      <ConfirmDialog
        open={!!fileToDelete}
        onOpenChange={(open) => !open && setFileToDelete(null)}
        title="Remover arquivo"
        description="Deseja realmente remover este arquivo?"
        method="DELETE"
        onPress={onDelete}
      />
    </>
  );
};
