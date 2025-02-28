import { Customer } from '@/src/entities/models/user';

export interface CustomerTableProps {
  initialCustomers?: Customer[];
  onLoadMore?: () => Promise<Customer[]>;
  onSort?: (column: keyof Customer, direction: 'asc' | 'desc') => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
}
