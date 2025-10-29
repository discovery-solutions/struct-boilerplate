"use client";
import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "defaultValue"> {
  value?: Date | string;
  onChange?: (value: Date | null) => void;
  defaultValue?: Date;
}

/**
 * DatePicker - Shadcn styled, seamless API like Input
 * Accepts string or Date, returns Date
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, name, onChange, placeholder = "Selecione uma data", defaultValue, ...props }, ref) => {
    const [date, setDate] = useState<Date | null>(defaultValue || new Date());

    const handleSelect = (_: any, newDate: Date | any) => {
      const updatedDate = newDate instanceof Date ? newDate : new Date(newDate as string);
      setDate(updatedDate);
      onChange?.({ target: { value: updatedDate, name } } as any);
    };

    return (
      <div className="relative w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              ref={ref as any}
              asChild
              type="button"
              role="button"
              variant="outline"
              data-empty={!date}
              name={name}
              className={cn(
                "cursor-pointer data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal",
                className
              )}
              {...props as any}
            >
              <p>

                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date ?? undefined} onSelect={handleSelect} />
          </PopoverContent>
        </Popover>

        {/* hidden input para forms nativos */}
        <input type="hidden" name={name} value={date ? date.toISOString() : ""} />
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
