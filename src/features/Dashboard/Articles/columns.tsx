import { type ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { ArticleType } from '@/type';

import { format } from 'date-fns';
import { MoreVerticalIcon } from 'lucide-react';

export function getColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (category: ArticleType) => void;
  onDelete: (category: ArticleType) => void;
}): ColumnDef<ArticleType>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      header: 'Image',
      cell: ({ row }) => (
        <div className="">
          {row.original.cover_image_url ? (
            <div className="w-36">
              <img
                src={row.original.cover_image_url}
                alt={`img-${row.original.id}`}
                className="rounded-md"
              />
            </div>
          ) : (
            <p className="">-</p>
          )}
        </div>
      ),
    },
    {
      header: 'Created At',
      cell: ({ row }) => (
        <p>{format(row.original.createdAt, 'EEEE, dd MMMM yyyy')}</p>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const articles = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                size="icon"
              >
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => onEdit(articles)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(articles)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
