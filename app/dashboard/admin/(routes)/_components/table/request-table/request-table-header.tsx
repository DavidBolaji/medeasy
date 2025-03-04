// RequestTableHeader.tsx
import React from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { TableHead, TableHeader, TableRow } from '@/app/_components/ui/table';
import { CheckboxMinus } from '@/app/_components/ui/check-box-minus';
import { IRequest } from '@/src/entities/models/requests';

interface RequestTableHeaderProps {
  allChecked: boolean;
  handleSort: (column: keyof IRequest) => void;
  toggleSelectAll: () => void;
  sortDirection: 'asc' | 'desc';
  sortColumn: keyof IRequest | null;
}

const headerList = [
  { key: 'title', title: 'Request', hasSort: true },
  { key: 'fname', title: 'Requester', hasSort: true },
  { key: 'provider', title: 'Provider', hasSort: true },
  { key: 'location', title: 'Location', hasSort: true },
  { key: 'createdAt', title: 'Request date', hasSort: true },
  { key: 'stage', title: 'Status', hasSort: true },
  { key: 'actions', title: '', hasSort: false },
];

export default function RequestTableHeader({
  allChecked,
  toggleSelectAll,
  handleSort,
  sortDirection,
  sortColumn,
}: RequestTableHeaderProps) {
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
              className={`pl-6 py-3 text-[#5C698A] font-instrument font-medium text-sm text-nowrap ${header.key === 'title' ? 'w-[500px]' : ''}`}
              key={header.title}
            >
              <button
                onClick={() => handleSort(header.key as keyof IRequest)}
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
