import { Link, useNavigate } from 'react-router-dom';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useAuthStore } from '@/stores/auth-store';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ onOpenChange, open }: Props) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-2xl font-medium tracking-tight font-albertSans">
            <span className="text-primary_2">Trail</span>.Script
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col h-full pb-2 overflow-y-auto">
          <div className="border-t">
            {isAuthenticated ? (
              <button
                className="flex items-center w-full p-4 text-base font-medium text-left hover:bg-primary_2 hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => onOpenChange(false)}
                className="flex items-center w-full p-4 text-base font-medium text-left hover:bg-primary_2 hover:text-white"
              >
                Log in
              </Link>
            )}
            {!isAuthenticated && (
              <Link
                to="/register"
                onClick={() => onOpenChange(false)}
                className="flex items-center w-full p-4 text-base font-medium text-left hover:bg-primary_2 hover:text-white"
              >
                Register
              </Link>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
