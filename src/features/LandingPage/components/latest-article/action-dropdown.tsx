import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';

import { useDeleteArticle } from '@/mutations/use-delete-article';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';

import { useAuthStore } from '@/stores/auth-store';
import { SheetAddArticle } from '@/components/sheet-add-article';

interface Props {
  user_id: number;
  document_id: string;
  onStoreArticle: () => void;
}

export const ActionDropdown = ({
  user_id,
  document_id,
  onStoreArticle,
}: Props) => {
  const navigate = useNavigate();
  const { isAuthenticated, id } = useAuthStore();

  const [addArticleOpen, setAddArticleOpen] = useState(false);

  const { mutate: mutateDelete, isPending: isPendingDelete } =
    useDeleteArticle();

  const onDeleteArticle = (document_id: string) => {
    mutateDelete(document_id);
  };

  if (isPendingDelete) {
    <Loading />;
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="text-black bg-transparent bg-white rounded-full shadow-md hover:text-white"
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute w-48 -right-5">
          <DropdownMenuLabel className="">Detail Action</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            View
          </DropdownMenuItem>
          {isAuthenticated && Number(id) === user_id && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  setAddArticleOpen(true);
                  onStoreArticle();
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onDeleteArticle(document_id)}
              >
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetAddArticle
        open={addArticleOpen}
        onOpenChange={setAddArticleOpen}
        action="update"
      />
    </div>
  );
};
