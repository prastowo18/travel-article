import { Link } from 'react-router-dom';
import {
  ChartBarStacked,
  LayoutDashboardIcon,
  MessageCircle,
  Newspaper,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { useAuthStore } from '@/stores/auth-store';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatar.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboardIcon,
    },
    {
      title: 'Articles',
      url: '/dashboard/articles',
      icon: Newspaper,
    },
    {
      title: 'Categories',
      url: '/dashboard/categories',
      icon: ChartBarStacked,
    },
    {
      title: 'Comments',
      url: '/dashboard/comments',
      icon: MessageCircle,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { email, username } = useAuthStore();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <span className="text-base font-semibold">Trail.Script</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: data.user.avatar,
            email: email ?? '',
            name: username ?? '',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
