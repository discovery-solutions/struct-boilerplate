"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type InputTagsProps = Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
  value: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ className, value = [], onChange, name, defaultValue, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = React.useState(defaultValue ? String(defaultValue) : "");

    const triggerChange = (newValues: string[]) => {
      const syntheticEvent = {
        target: {
          name,
          value: newValues,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    };

    const addPendingDataPoint = () => {
      if (pendingDataPoint.trim() === "") return;
      const newValues = Array.from(new Set([...value, pendingDataPoint.trim()]));
      triggerChange(newValues);
      setPendingDataPoint("");
    };

    const removeTag = (tag: string) => {
      const newValues = value.filter((i) => i !== tag);
      triggerChange(newValues);
    };

    return (
      <div
        className={cn(
          "overflow-hidden border-input dark:bg-input/30 flex min-h-9 w-full flex-wrap gap-2 rounded-md border bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {value && value?.map?.((item) => (
          <Badge key={item} variant="secondary">
            <span className="block max-w-xs truncate break-words">{item}</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 size-4 p-0"
              onClick={() => removeTag(item)}
              type="button"
            >
              <XIcon />
            </Button>
          </Badge>
        ))}

        <input
          className="placeholder:text-muted-foreground flex-1 outline-none"
          value={pendingDataPoint}
          onChange={(e) => setPendingDataPoint(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addPendingDataPoint();
            } else if (
              e.key === "Backspace" &&
              pendingDataPoint.length === 0 &&
              value.length > 0
            ) {
              e.preventDefault();
              triggerChange(value.slice(0, -1));
            }
          }}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

InputTags.displayName = "InputTags";

export { InputTags };
