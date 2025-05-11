import { type ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Category } from '@/type';

import { format } from 'date-fns';
import { MoreVerticalIcon } from 'lucide-react';

export function getColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}): ColumnDef<Category>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      header: 'Description',
      cell: ({ row }) => <p>{row.original.description ?? '-'}</p>,
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
        const category = row.original;
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
              <DropdownMenuItem onClick={() => onEdit(category)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(category)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
