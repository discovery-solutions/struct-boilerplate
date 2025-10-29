"use client";
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiSelectFieldProps {
  name: string;
  value?: string[];
  options: { label: string; value: string }[];
  onChange?: (event: { target: { name: string; value: string[] } }) => void;
  placeholder?: string;
}

export function MultiSelectField({
  name,
  value = [],
  options,
  onChange,
  placeholder = "Selecione",
}: MultiSelectFieldProps) {
  const [open, setOpen] = React.useState(false);

  const toggleValue = (val: string) => {
    const newValues = value.includes(val)
      ? value.filter(v => v !== val)
      : [...value, val];
    onChange?.({ target: { name, value: newValues } });
  };

  const removeValue = (val: string) => {
    onChange?.({ target: { name, value: value.filter(v => v !== val) } });
  };

  const selectedOptions = options.filter(o => value.includes(o.value));

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={cn(
          "flex w-full min-h-[38px] items-center justify-between gap-2 rounded-md border px-2 py-1 text-sm flex-wrap",
          !value.length && "text-muted-foreground"
        )}
      >
        {selectedOptions.length > 0 ? (
          <div className="flex flex-wrap gap-1 flex-1">
            {selectedOptions.map(opt => (
              <span
                key={opt.value}
                className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground"
              >
                {opt.label}
                <XIcon
                  className="size-3 cursor-pointer"
                  onClick={e => {
                    e.stopPropagation(); // não abre popover
                    removeValue(opt.value);
                  }}
                />
              </span>
            ))}
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
        <ChevronDownIcon className="size-4 shrink-0" />
      </Popover.Trigger>

      <Popover.Content
        className="w-[var(--radix-popover-trigger-width)] mt-1 rounded-md border bg-popover p-1 shadow-md z-30"
        side="bottom"
        align="start"
      >
        {options.map(opt => (
          <div
            key={opt.value}
            className="flex text-sm w-full items-center justify-between p-1.5 rounded cursor-pointer hover:bg-primary hover:text-primary-foreground"
            onClick={() => toggleValue(opt.value)}
          >
            <span>{opt.label}</span>
            {value.includes(opt.value) && <CheckIcon className="size-4" />}
          </div>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
}
