import { type ColumnDef } from '@tanstack/react-table';

import type { CommentType } from '@/type';

import { format } from 'date-fns';

export function getColumns(): ColumnDef<CommentType>[] {
  return [
    {
      accessorKey: 'content',
      header: 'Content',
    },
    {
      accessorKey: 'user.username',
      header: 'User',
    },
    {
      header: 'Created At',
      cell: ({ row }) => (
        <p>{format(row.original.createdAt, 'EEEE, dd MMMM yyyy')}</p>
      ),
    },
  ];
}
