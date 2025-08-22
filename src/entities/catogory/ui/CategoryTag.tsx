import { Tag } from "lucide-react";
import type { CategoryType } from "../model/Category";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/components/ui/hover-card";

interface CategoryTagProps {
  size?: number;
  category: CategoryType;
}
function CategoryTag({
  size = 16,
  category
}: CategoryTagProps) {
  const { name, description, colorHex } = category;

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger>
        <div className="p-1 w-fit rounded-sm flex justify-center items-center hover:bg-zinc-400">
          <Tag size={size} fill={colorHex} color="#D9D9D9"/>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="p-2">
        <div className="space-y-1">
          <h4 className="text-xs">{name}</h4>
          {description && <p className="text-muted-foreground text-xs">{description}</p>}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CategoryTag;