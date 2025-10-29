"use client";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectFieldOption {
  label: string;
  value: string;
}

export interface SelectFieldProps {
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  options: SelectFieldOption[];
  onChange?: (event: { target: { name: string; value: string } }) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

/**
 * SelectField - Agnostic component for rendering Selects in forms
 *
 * Usage: Controlled via onChange (name/value) - prepared for FieldRender
 */
export const SelectField = ({
  name,
  value,
  placeholder = "Selecione",
  options,
  onChange,
  disabled = false,
  required,
  error,
  className,
}: SelectFieldProps) => {
  const OPTIONS = useMemo(() => {
    return options.map(option => typeof option === "string" ? { label: option, value: option } : option);
  }, [options]);

  const valueMap = useMemo(() => {
    const map = new Map<string, any>();
    for (const opt of OPTIONS) {
      map.set(String(opt.value), opt.value);
    }
    return map;
  }, [OPTIONS]);

  useEffect(() => {
    if (value)
      onChange?.({ target: { name, value: valueMap.get(value) ?? value } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormItem className={className}>
      <FormControl>
        <Select
          value={value ?? ""}
          required={required}
          disabled={disabled}
          onValueChange={(val: string) => {
            const realValue = valueMap.get(val) ?? val;
            onChange?.({ target: { name, value: realValue } });
          }}
        >
          <SelectTrigger aria-invalid={!!error} className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {OPTIONS?.map((opt: any) => (
              <SelectItem key={opt?.value} value={opt?.value}>
                {opt?.label || opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};
