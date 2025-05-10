import { Menu, UserRound } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import LogoutButton from '@/components/logout-button';

import { useAuthStore } from '@/stores/auth-store';

import { MENU_ITEM } from '@/contants';

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <main className="">
      <div className="px-5 pt-5 lg:pt-8 lg:px-7">
        <nav className="flex items-center justify-between">
          <div className="p-2 bg-white rounded-md lg:hidden">
            <Menu className="size-5" />
          </div>
          <Link to="/">
            <h1 className="text-2xl font-medium tracking-tight font-albertSans">
              <span className="text-primary_2">Trail</span>.Script
            </h1>
          </Link>
          <div className="items-center justify-between hidden py-4 bg-white rounded-full lg:w-1/2 xl:w-[40%] 2xl:w-[35%] lg:flex lg:px-10 xl:px-14 font-albertSans text-sm  ">
            {MENU_ITEM.map((e, i) => (
              <NavLink
                key={i}
                to={e.link}
                className={({ isActive }) =>
                  `tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-secondary_2' : 'text-[#1D1D1D]'
                  } hover:text-secondary_2`
                }
              >
                {e.title}
              </NavLink>
            ))}
          </div>
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
    </main>
  );
};

export default LandingPageLayout;

const UserDropdown = () => {
  const navigate = useNavigate();
  const { username, email } = useAuthStore();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
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
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
