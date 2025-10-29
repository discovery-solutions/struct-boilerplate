"use client";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Loader = ({ containerClassName, className }: { className?: string, containerClassName?: string }) => {
  return (
    <div className={cn("flex items-center justify-center", containerClassName)}>
      <Loader2 className={cn("animate-spin size-6", className)} />
    </div>
  )
}