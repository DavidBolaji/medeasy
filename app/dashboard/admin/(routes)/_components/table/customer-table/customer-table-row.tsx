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
import { Customer } from '@/src/entities/models/user';

import { UserIcon } from 'lucide-react';
import Link from 'next/link';

interface CustomerTableRowProps {
  customer: Customer;
  selectedItems: Set<string>;
  toggleSelectItem: (id: string) => void;
}

const linksList = (user: Customer) => [
  {
    id: 'link1',
    title: 'Manage',
    link: `/dashboard/admin/user-management/${user.id}`,
  },
  {
    id: 'link2',
    title: 'Verify',
    link: `/dashboard/admin/user-management/verify/${user.id}`,
  },
];

export default function CustomerTableRow({
  customer,
  selectedItems,
  toggleSelectItem,
}: CustomerTableRowProps) {
  return (
    <TableRow
      className={
        selectedItems.has(customer.id) ? 'bg-black-600' : 'border-[#E4E4EF]'
      }
    >
      <TableCell className="pl-6 py-3 flex mt-2 items-end h-full">
        <Checkbox
          checked={selectedItems.has(customer.id)}
          onCheckedChange={() => toggleSelectItem(customer.id)}
        />
      </TableCell>
      <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage alt={`@${customer.fname}`} />
            <AvatarFallback className="bg-[#5C698A]">
              <UserIcon color="white" />
            </AvatarFallback>
          </Avatar>
          <span className="font-normal text-sm  black-[#141923]">
            {customer.fname} {customer.lname}
          </span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3 font-normal text-sm black-[#141923]">
        {customer?.role}
      </TableCell>
      <TableCell className="pl-6 py-3 font-normal text-sm black-[#141923]">
        {customer?.email}
      </TableCell>
      <TableCell className="pl-6 py-3 font-normal text-sm black-[#141923]">
        {customer?.createdAt}
      </TableCell>

      <TableCell className="pl-6 py-3 font-normal text-sm black-[#141923] text-nowrap">
        <Badge
          variant="outline"
          className={cn('capitalize rounded-full font-instrument font-normal')}
        >
          {customer.verified === 'TRUE'
            ? 'Verified'
            : customer.verified === 'FALSE'
              ? 'Rejected'
              : 'Unverified'}
        </Badge>
      </TableCell>
      <TableCell className="py-3">
        <div className="flex items-center gap-2">
          {linksList(customer).map((link) => (
            <Button
              key={link.id}
              className="bg-black-600 hover:border-primary font-normal h-7 items-center justify-center"
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
