"use client";
import { useFormContext, FormProvider as RHFProvider } from "react-hook-form";
import { Label } from "@/components/ui/label";

const Form = RHFProvider;

export const FormItem = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={className}>{children}</div>
);

export const FormLabel = ({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) => (
  <Label htmlFor={htmlFor} className="mb-1 block">
    {children}
  </Label>
);

export const FormControl = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const FormMessage = ({ children }: { children?: React.ReactNode }) => {
  if (!children) return null;
  return <p className="text-sm text-destructive">{children}</p>;
};

export const useFormField = () => {
  const methods = useFormContext();
  if (!methods) throw new Error("useFormField must be used inside FormProvider");
  return methods;
};

export { Form };
