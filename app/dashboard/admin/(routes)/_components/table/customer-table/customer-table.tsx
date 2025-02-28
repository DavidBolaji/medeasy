'use client';

import * as React from 'react';
import CustomerTableHeader from './customer-table-header';
import { CustomerTableProps } from './types';

import CustomerTableRow from './customer-table-row';
import { Empty } from 'antd';
import { useTable } from '../../../_hooks/use-table';
import { filterCustomer } from './action';
import { MainHeader } from '../main-header';
import Pagination from '../pagination';
import { Table, TableBody } from '@/app/_components/ui/table';
import { Customer } from '@/src/entities/models/user';

export default function CustomerTable({
  initialCustomers = [],
  onSort,
  totalPages,
  page,
  itemsPerPage,
}: CustomerTableProps) {
  const {
    items,
    ref,
    allChecked,
    handleSort,
    sortColumn,
    sortDirection,
    handleSearch,
    toggleSelectAll,
    toggleSelectItem,
    selectedItems,
    loading,
  } = useTable<Customer>({
    initialItems: initialCustomers,
    onSort,
    onSearch: (form, params) => {
      filterCustomer(form, params);
    },
    onFilter(form, params, path) {
      filterCustomer(form, params, path);
    },
  });

  return (
    <div className="w-full scrollbar-hide">
      <MainHeader
        title={'Users'}
        placeholder="Search users by name and email"
        handleSearch={handleSearch}
        search
        more
      />
      <div className="rounded-b-2xl border-t-0 bg-white overflow-hidden border border-[#E4E4EF]">
        <Table>
          <CustomerTableHeader
            handleSort={handleSort}
            allChecked={allChecked}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            toggleSelectAll={toggleSelectAll}
          />
          <TableBody>
            {items.map((customer: Customer) => (
              <CustomerTableRow
                key={customer.id}
                customer={customer}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
              />
            ))}
          </TableBody>
        </Table>
        {items.length < 1 && (
          <div className="py-8">
            <Empty />
          </div>
        )}
      </div>

      <Pagination
        ref={ref}
        isMobile={false}
        loading={loading}
        totalPages={totalPages ?? 0}
        page={page ?? 1}
        itemsPerPage={itemsPerPage ?? 10}
        onFilter={filterCustomer}
      />
    </div>
  );
}
