"use client";
import { toast } from "sonner";
import * as React from "react";
import { fetcher } from "@discovery-solutions/struct/client";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelectField } from "./multi";

interface ModelSelectProps {
  model: string;
  value?: string | string[];
  name: string;
  params?: any;
  onChange: (e: { target: { value: string | string[]; name: string } }) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  getLabel?: (item: any) => string;
  getValue?: (item: any) => string;
  multiple?: boolean;
}

export function ModelSelect({
  model,
  value,
  onChange,
  params,
  placeholder = "Selecione...",
  disabled = false,
  name,
  className,
  getLabel,
  getValue,
  multiple = false,
}: ModelSelectProps) {
  const { data, isLoading, isError } = useQuery({
    staleTime: 1000 * 60 * 5,
    queryKey: [model, "options", params],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryFn: () =>
      model.length === 0
        ? []
        : fetcher(`/api/${model}`, params ? { params } : undefined).then(
          (data) =>
            data.map((item: any) => ({
              label: getLabel
                ? getLabel(item)
                : item?.name ||
                item?.title ||
                item?.course?.name ||
                item?._id ||
                "Sem nome",
              value: getValue
                ? getValue(item)
                : item?.value || item?._id || "Sem valor",
            }))
        ),
  });

  const [open, setOpen] = React.useState(false);

  const selectedOptions = React.useMemo(() => {
    if (!data) return [];

    if (multiple) {
      const values = Array.isArray(value) ? value : [];
      return data.filter((opt: any) => values.some((item: any) => (item?._id || item) === opt.value));
    } else {
      return data.filter((opt: any) => opt.value === value);
    }
  }, [value, multiple, data]);

  const selectedLabels = selectedOptions.map((d: any) => d.label);
  const selectedValues = selectedOptions.map((d: any) => d.value);

  const updateValue = (val: string) => {
    if (val === "error" || val === "empty")
      return toast.error("Não foi possível carregar as opções.");

    if (multiple) {
      let next: string[];
      if (selectedValues.includes(val)) {
        next = selectedValues.filter((v: string) => v !== val);
      } else {
        next = [...selectedValues, val];
      }
      return onChange({ target: { value: next, name } });
    } else {
      return onChange({ target: { value: val, name } });
    }
  };

  if (isError || isLoading) {
    return (
      <Select disabled value="">
        <SelectTrigger className="w-full">
          <SelectValue placeholder={isLoading ? "Carregando..." : "Erro"} />
        </SelectTrigger>
      </Select>
    );
  }

  // Quando há muitas opções, usar modal com busca
  if (data && data.length > 8) {
    return (
      <div className={className}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between !px-2.5 text-muted-foreground"
              disabled={disabled}
            >
              {multiple
                ? selectedLabels?.join(", ") || placeholder
                : selectedLabels?.[0] || placeholder}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Selecione uma opção</DialogTitle>
            </DialogHeader>
            <Command className="flex flex-col gap-3">
              <CommandInput placeholder="Pesquisar..." />
              <CommandList>
                <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
                {data.map((option: any) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    className="my-1 flex items-center gap-2"
                    onSelect={() => updateValue(option.value)}
                  >
                    {multiple && (
                      <Checkbox
                        checked={selectedValues.includes(option.value)}
                        className="mt-1"
                      />
                    )}
                    {option.label}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (multiple) {
    return (
      <div className={className}>
        <MultiSelectField
          name={name}
          value={selectedValues}
          options={data}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />
      </div>
    )
  }

  // Select padrão (quando poucas opções)
  return (
    <div className={className}>
      <Select
        onValueChange={updateValue}
        value={value as string}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data?.map((option: any) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
            {!isLoading && data?.length === 0 && (
              <SelectItem value="empty" disabled>
                Nenhuma opção disponível
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
