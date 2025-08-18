// AppSidebar.tsx
import * as React from "react";
import { Separator } from "@/shared/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";

export type SidebarItemType = {
  title: string;
  url: string;
  icon?: LucideIcon | null;
  subItems?: SidebarItemType[];
};

export type SidebarGroupDataType = {
  group: string;
  items: SidebarItemType[];
};

type AppSidebarProps = {
  data: SidebarGroupDataType[];
  className?: string;
  collapsible?: "icon";
};

export default function AppSidebar({
  data,
  className,
  collapsible = "icon",
}: AppSidebarProps) {
  const renderItems = React.useCallback(
    (items: SidebarItemType[], level = 0) => (
      <SidebarMenu style={level ? { paddingLeft: level * 12 } : undefined}>
        {items.map((item) => (
          <SidebarMenuItem key={`${item.title}-${item.url}`}>
            <SidebarMenuButton tooltip={item.title} asChild>
              <a href={item.url}>
                {item.icon ? <item.icon className="size-5" /> : null}
                <span className="text-sm">{item.title}</span>
              </a>
            </SidebarMenuButton>
            {item.subItems?.length ? (
              <div className="mt-1">{renderItems(item.subItems, level + 1)}</div>
            ) : null}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    ),
    []
  );

  return (
    <Sidebar collapsible={collapsible} className={className}>
      <SidebarContent>
        {data.map((group, idx) => (
          <React.Fragment key={group.group}>
            <SidebarGroup>
              <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
              <SidebarGroupContent>{renderItems(group.items)}</SidebarGroupContent>
            </SidebarGroup>
            {idx !== data.length - 1 ? <Separator /> : null}
          </React.Fragment>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
