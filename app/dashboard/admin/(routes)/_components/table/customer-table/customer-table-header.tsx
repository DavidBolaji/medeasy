// CustomerTableHeader.tsx
import React from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { TableHead, TableHeader, TableRow } from '@/app/_components/ui/table';
import { CheckboxMinus } from '@/app/_components/ui/check-box-minus';
import { Customer } from '@/src/entities/models/user';

interface CustomerTableHeaderProps {
  allChecked: boolean;
  handleSort: (column: keyof Customer) => void;
  toggleSelectAll: () => void;
  sortDirection: 'asc' | 'desc';
  sortColumn: keyof Customer | null;
}

const headerList = [
  { key: 'fname', title: 'Customer name', hasSort: true },
  { key: 'role', title: 'User type', hasSort: true },
  { key: 'email', title: 'Email', hasSort: true },
  { key: 'createdAt', title: 'Reg date', hasSort: true },
  { key: 'verified', title: 'Status', hasSort: true },
  { key: 'actions', title: '', hasSort: false },
];

export default function CustomerTableHeader({
  allChecked,
  toggleSelectAll,
  handleSort,
  sortDirection,
  sortColumn,
}: CustomerTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="bg-transparent">
        <TableHead className="pl-6 h-full py-3 flex items-center">
          <CheckboxMinus
            checked={allChecked}
            onCheckedChange={toggleSelectAll}
          />
        </TableHead>
        {headerList.map((header) =>
          header.hasSort ? (
            <TableHead
              className="pl-6 py-3 text-[#5C698A] font-instrument font-medium text-sm text-nowrap"
              key={header.title}
            >
              <button
                onClick={() => handleSort(header.key as keyof Customer)}
                className="flex items-center gap-1"
              >
                {header.title}
                {sortColumn === header.key ? (
                  sortDirection === 'asc' ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )
                ) : (
                  <ChevronDown className="h-4 w-4 opacity-50" />
                )}
              </button>
            </TableHead>
          ) : (
            <TableHead key={header.title}>{header.title}</TableHead>
          )
        )}
      </TableRow>
    </TableHeader>
  );
}
