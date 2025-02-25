import { ROLE } from '@prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { format, parse } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { states } from './data';
import { RequestBiderSchemaType } from '@/src/entities/models/bid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateFileType = (type: string) => {
  const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
  if (!validTypes.includes(type)) {
    throw new Error('Please upload a PNG, JPEG, or PDF file');
  }
  return true;
};

export const validateFileSize = (size: number) => {
  if (size > 5 * 1024 * 1024) {
    throw new Error('File size must be less than 5MB');
  }
  return true;
};

export const formateDateToDbDate = (date: string): string => {
  const nDate = parse(date, 'M/d/yyyy, hh:mm:ss a', new Date());
  // Format the date into YYYY-MM-DD
  const formattedDate = format(nDate, 'yyyy-MM-dd');
  return formattedDate;
};

export const formatDateToDbDate2 = (date: string): string => {
  const nDate = new Date(date); // Directly create a Date object
  if (isNaN(nDate.getTime())) throw new Error('Invalid date provided');

  return format(nDate, 'yyyy-MM-dd'); // Format it as YYYY-MM-DD
};

export const parseCurrencyToInt = (formattedValue: string): number => {
  return parseInt(formattedValue.replace(/[^\d]/g, ''), 10) || 0;
};

export const parseIntToCurrency = (value: string): string => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
  return formattedValue;
};

export const getRole = (path: string): ROLE => {
  let role = path.split('/').includes('help-provider')
    ? 'HelpProvider'
    : ('AccountOwner' as ROLE);
  return role;
};

export const getPath = (path: string) => {
  let url = path.split('/').includes('help-provider')
    ? 'help-provider'
    : 'account-owner';
  return url;
};

export const getState = (country: string) => {
  return states[country];
};

export const getRating = (bider: RequestBiderSchemaType) => {
  const aggregateRate =
    bider?.user?.receivedReview.reduce((agg, cur) => agg + cur.star, 0) || 0;

  const totalReviews = bider?.user?.receivedReview.length || 0;

  if (totalReviews === 0) return 0; // Avoid division by zero

  // Calculate average rating
  const averageRate = aggregateRate / totalReviews;

  // Round to the nearest 0.5 step
  const finalRate = Math.round(averageRate * 2) / 2;

  return finalRate;
};
