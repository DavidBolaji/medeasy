'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { Badge } from '@/app/_components/ui/badge';
import { Button } from '@/app/_components/ui/button';

import { Checkbox } from '@/app/_components/ui/checkbox';
import { TableCell, TableRow } from '@/app/_components/ui/table';
import { cn } from '@/app/_lib/utils';
import { IRequest } from '@/src/entities/models/requests';
import { Customer } from '@/src/entities/models/user';

import { UserIcon } from 'lucide-react';
import Link from 'next/link';

interface RequestTableRowProps {
  request: IRequest;
  selectedItems: Set<string>;
  toggleSelectItem: (id: string) => void;
}

const linksList = (request: IRequest) => [
  {
    id: 'link1',
    title: 'View',
    link: `/dashboard/admin/help-requests/${request.id}`,
  },
];

export default function RequestTableRow({
  request,
  selectedItems,
  toggleSelectItem,
}: RequestTableRowProps) {
  const isEmpty = !request.acceptedBider?.user.fname.length;

  return (
    <TableRow
      className={
        selectedItems.has(request.id) ? 'bg-black-600' : 'border-[#E4E4EF]'
      }
    >
      <TableCell className="pl-6 py-3 flex mt-2 items-end h-full">
        <Checkbox
          checked={selectedItems.has(request.id)}
          onCheckedChange={() => toggleSelectItem(request.id)}
        />
      </TableCell>

      <TableCell className="pl-6 max-w-[250px] text-ellipsis overflow-hidden text-nowrap py-3 font-normal text-sm black-[#141923]">
        {request?.title}
      </TableCell>
      <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage alt={`@${request.user?.fname}`} />
            <AvatarFallback className="bg-[#5C698A]">
              <UserIcon color="white" />
            </AvatarFallback>
          </Avatar>
          <span className="font-normal text-sm  black-[#141923]">
            {request.user?.fname} {request.user?.lname}
          </span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3">
        {isEmpty ? (
          '-'
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage alt={`@${request.acceptedBider?.user.fname}`} />
              <AvatarFallback className="bg-[#5C698A]">
                <UserIcon color="white" />
              </AvatarFallback>
            </Avatar>
            <span className="font-normal text-sm  black-[#141923]">
              {request.acceptedBider?.user.fname}{' '}
              {request.acceptedBider?.user.lname}
            </span>
          </div>
        )}
      </TableCell>
      <TableCell className="pl-6 py-3 font-normal text-sm black-[#141923]">
        {request?.location}
      </TableCell>
      <TableCell className="pl-6 py-3 font-normal text-sm black-[#141923]">
        {request?.createdAt}
      </TableCell>

      <TableCell className="pl-6 py-3 font-normal text-sm black-[#141923] text-nowrap">
        <Badge
          variant="outline"
          className={cn(
            'capitalize rounded-full text-xs font-instrument font-normal w-20 flex justify-center'
          )}
        >
          {request.stage.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell className="py-3">
        <div className="flex items-center gap-2">
          {linksList(request).map((link) => (
            <Button
              key={link.id}
              className="bg-black-600 hover:border-primary font-normal h-4 w-10 items-center justify-center"
              asChild
            >
              <Link href={link.link}>{link.title}</Link>
            </Button>
          ))}
        </div>
      </TableCell>
    </TableRow>
  );
}
