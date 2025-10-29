"use client";
import { FileUpload, FileUploadProps } from "@/components/ui/input/file";

export const ImageUpload = (props: FileUploadProps) => (
  <FileUpload accept="image/*" {...props} />
)
