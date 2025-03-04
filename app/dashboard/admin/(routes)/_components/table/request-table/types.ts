import { IRequest } from '@/src/entities/models/requests';

export interface RequestTableProps {
  initialCustomers?: IRequest[];
  onLoadMore?: () => Promise<IRequest[]>;
  onSort?: (column: keyof IRequest, direction: 'asc' | 'desc') => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
}
