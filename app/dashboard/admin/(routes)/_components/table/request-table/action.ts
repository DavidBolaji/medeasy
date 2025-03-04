'use server';

import { redirect } from 'next/navigation';

export const filterRequest = (
  formData: FormData,
  currentParams: URLSearchParams,
  path?: string
) => {
  const params = new URLSearchParams(currentParams);

  // Extract form data
  const page = formData.get('page') as string;
  const sort =
    (formData.get('sort') as string) || params.get('sort') || 'fname';
  const sortOrder =
    (formData.get('sortOrder') as string) || params.get('sortOrder') || 'asc';

  const dateFrom = formData.get('dateFrom') as string;
  const dateTo = formData.get('dateTo') as string;

  const searchQuery = params.get('searchQuery') as string;

  // Handle date range filters
  if (dateFrom) {
    params.set('dateFrom', dateFrom);
  } else {
    params.delete('dateFrom');
  }

  if (dateTo) {
    params.set('dateTo', dateTo);
  } else {
    params.delete('dateTo');
  }

  // Handle pagination and sorting
  if (page) {
    params.set('page', page);
  } else {
    params.delete('page');
  }

  if (sort) {
    params.set('sort', sort);
  } else {
    params.delete('sort');
  }

  if (sortOrder) {
    params.set('sortOrder', sortOrder);
  } else {
    params.delete('sortOrder');
  }

  // Handle search query
  if (searchQuery) {
    params.set('searchQuery', searchQuery);
  } else {
    params.delete('searchQuery');
  }

  // Check if there are any parameters left
  const newQuery = params.toString();
  if (newQuery) {
    const redirectPath = path
      ? `${path}?${newQuery}`
      : `/dashboard/admin/help-requests?${newQuery}`;
    redirect(redirectPath);
  } else {
    // Redirect to the base path if no parameters exist
    const redirectPath = path || '/dashboard/admin/help-requests';
    redirect(redirectPath);
  }
};
