"use client";
import { cn, truncate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TagsViewProps {
  tags?: string[];
  limit?: number;
  className?: string;
  badgeClassName?: string;
  truncateAt?: number;
}

export function TagsView({ tags = [], limit = 4, truncateAt = 17, className, badgeClassName }: TagsViewProps) {
  if (!tags.length) return null;

  const visibleTags = tags.slice(0, limit);
  const hiddenCount = tags.length - limit;

  if (visibleTags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {visibleTags.map((tag) => (
        <Badge variant="outline" title={tag} key={tag} className={badgeClassName}>
          {truncate(tag, truncateAt)}
        </Badge>
      ))}
      {(visibleTags.length > 0 && hiddenCount > 0) && (
        <Badge variant="outline" title={`+${hiddenCount} mais`} className={badgeClassName}>
          {truncate(`+${hiddenCount} mais`, 17)}
        </Badge>
      )}
    </div>
  );
}
