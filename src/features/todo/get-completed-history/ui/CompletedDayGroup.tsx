import { CategoryTag, type CategoryType } from "@/entities/catogory";
import type { TodoCompletedHistory } from "@/entities/todo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import Horizontal from "@/shared/components/ui/Horizontal";
import Vertical from "@/shared/components/ui/Vertical";

interface CompletedDayGroupProps {
  date: string;
  todos: TodoCompletedHistory[];
  categories: CategoryType[];
}

function CompletedDayGroup({ 
  date,
  todos,
  categories
}: CompletedDayGroupProps) {
  const findCategoryById = (id: number): CategoryType | undefined => {
    const category = categories.find(cat => cat.id === id);
    if (category) return category;
  }
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue={date}>
      <AccordionItem value={date}>
        <AccordionTrigger className="p-2">
          <span className="text-lg font-bold">
            {date} ({todos.length})
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-2">
          <Vertical className="gap-2">
            {todos.map((it) => {
              const category = it.categoryId ? findCategoryById(it.categoryId) : null;
              return (
                <li key={`${it.type}-${it.id}`} className="rounded-md border p-2">
                  <Horizontal className="gap-1">
                    {category && <CategoryTag category={category} size={12} />}
                    <div className="text-sm font-medium truncate">
                        {it.title}
                      </div>
                    </Horizontal>
                    <div className="text-xs text-muted-foreground">
                      {it.type} • {it.completedDate}{it.importance ? ` • ${it.importance}` : ""}
                    </div>
                  </li>
                )
              })}
          </Vertical>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CompletedDayGroup;