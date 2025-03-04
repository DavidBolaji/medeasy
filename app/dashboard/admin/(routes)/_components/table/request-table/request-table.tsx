'use client';

import * as React from 'react';
import RequestTableHeader from './request-table-header';
import { RequestTableProps } from './types';

import { Empty } from 'antd';
import { useTable } from '../../../_hooks/use-table';
import { filterRequest } from './action';
import { MainHeader } from '../main-header';
import Pagination from '../pagination';
import { Table, TableBody } from '@/app/_components/ui/table';
import RequestTableRow from './request-table-row';
import { IRequest } from '@/src/entities/models/requests';
import { useDeleteModal } from '../hooks/use-delete-modal';

export default function RequestTable({
  initialCustomers = [],
  onSort,
  totalPages,
  page,
  itemsPerPage,
}: RequestTableProps) {
  const { toggleModal } = useDeleteModal();
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
    deleteMultiple,
  } = useTable<IRequest>({
    initialItems: initialCustomers,
    onSort,
    onSearch: (form, params) => {
      filterRequest(form, params);
    },
    onFilter(form, params, path) {
      filterRequest(form, params, path);
    },
    async onDeleteMany(data) {
      toggleModal(true, 'DELETE_REQUEST', data);
    },
  });

  return (
    <div className="w-full scrollbar-hide overflow-hidden">
      <MainHeader
        title={'Users'}
        placeholder="Search users by request and location"
        handleSearch={handleSearch}
        action={deleteMultiple}
        search
        more
      />
      <div className="rounded-b-2xl scrollbar-hide border-t-0 bg-white overflow-hidden border border-[#E4E4EF]">
        <Table>
          <RequestTableHeader
            handleSort={handleSort}
            allChecked={allChecked}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            toggleSelectAll={toggleSelectAll}
          />
          <TableBody>
            {items.map((request: IRequest) => (
              <RequestTableRow
                key={request.id}
                request={request}
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
        onFilter={filterRequest}
      />
    </div>
  );
}
