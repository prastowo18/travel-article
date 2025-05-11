import { useLocation, useNavigate } from 'react-router-dom';
import { type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const { toggleSidebar, isMobile } = useSidebar();

  const activeItem = items
    .filter(
      (item) =>
        location.pathname === item.url ||
        location.pathname.startsWith(item.url + '/')
    )
    .sort((a, b) => b.url.length - a.url.length)[0];

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = item === activeItem;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  onClick={() => {
                    if (!isActive) navigate(item.url);
                    if (isMobile) toggleSidebar();
                  }}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
