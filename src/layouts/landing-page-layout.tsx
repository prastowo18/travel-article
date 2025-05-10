import { useState } from 'react';
import { Menu, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { NavbarSidebar } from '@/components/navbar-sidebar-mobile';

import { useAuthStore } from '@/stores/auth-store';

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <main className="">
      <div className="px-5 pt-5 lg:pt-8 lg:px-7">
        <nav className="flex items-center justify-between">
          <Button
            size="icon"
            variant="outline"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
          </Button>

          <Link to="/">
            <h1 className="text-2xl font-medium tracking-tight font-albertSans">
              <span className="text-primary_2">Trail</span>.Script
            </h1>
          </Link>
          <div className="">
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <Button asChild className="rounded-full bg-primary_2 px-7">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
      {children}
      <footer className="p-5 bg-primary_2">
        <p className="text-xl text-center text-white underline font-albertSans font-extralight underline-offset-4">
          Trail.Script
        </p>
      </footer>
      <NavbarSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </main>
  );
};

export default LandingPageLayout;

const UserDropdown = () => {
  const navigate = useNavigate();
  const { username, email } = useAuthStore();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="p-2 text-black bg-white rounded-full hover:text-white"
          >
            <UserRound className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute w-48 -right-5">
          <DropdownMenuLabel className="">
            <div className="">
              <p className="capitalize">{username}</p>
              <p className="text-xs font-extralight">{email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
