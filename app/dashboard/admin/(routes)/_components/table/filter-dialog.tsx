'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { X } from 'lucide-react';
import {} from 'date-fns';
import { Button } from '@/app/_components/ui/button';

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onFilter?: (form: FormData, params: URLSearchParams, path?: string) => void;
  calender?: boolean;
  payment?: boolean;
  status?: boolean;
  pStatus?: boolean;
  pType?: boolean;
  post?: boolean;
  calenderTxt?: string;
}

export default function FilterDialog({
  open,
  onClose,
  // onFilter,

  // calender,
  // payment,
  // status,
  // post,
  // pStatus,
  // pType,
  // calenderTxt,
}: FilterDialogProps) {
  const searchParams = useSearchParams();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    if (dateFrom && dateTo) {
      const adjustedFrom = dateFrom ? new Date(dateFrom) : undefined;
      const adjustedTo = dateTo ? new Date(dateTo) : undefined;

      if (adjustedFrom) adjustedFrom.setDate(adjustedFrom.getDate() - 1);
      if (adjustedTo) adjustedTo.setDate(adjustedTo.getDate() - 1);
      setDate({
        from: adjustedFrom,
        to: adjustedTo,
      });
    }
  }, [searchParams]);

  // const isChecked = (name: string, value: string) => {
  //   // console.log(name, value)
  //   const paramValues = searchParams.getAll(name); // Get all values for the parameter
  //   // console.log(paramValues)
  //   return paramValues.includes(value); // Check if the value is in the list
  // };

  // const handleFilter = (formData: FormData) => {
  //   if (date) {
  //     const adjustedFrom = date.from ? new Date(date.from) : undefined;
  //     const adjustedTo = date.to ? new Date(date.to) : undefined;

  //     if (adjustedFrom) adjustedFrom.setDate(adjustedFrom.getDate() + 1);
  //     if (adjustedTo) adjustedTo.setDate(adjustedTo.getDate() + 1);
  //     formData.append('dateFrom', adjustedFrom?.toISOString() || '');
  //     formData.append('dateTo', adjustedTo?.toISOString() || '');
  //     formData.append('dateTo', adjustedTo?.toISOString() || '');
  //   }
  //   // onFilter(formData, searchParams);
  // };

  const handleReset = () => {
    // Clear the selected date range
    setDate(undefined);

    // Uncheck all checkboxes in the form
    const form = btnRef.current?.form as HTMLFormElement | null;
    if (form) {
      const checkboxes = form.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]'
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }

    // Append empty date fields
    const formData = new FormData();
    // formData.append("dateFrom", "");
    // formData.append("dateTo", "");
    // Ensure `dateFrom` and `dateTo` are cleared from the current params
    // const params = new URLSearchParams(searchParams);
    // params.delete('dateFrom');
    // params.delete('dateTo');
    // onFilter(formData, params);

    // Trigger Apply to reset filters
    btnRef.current?.click();
    // onFilter(formData, params);
    // Optionally close the dialog
    onClose();
  };

  if (!open) return null;

  return (
    <div className="flex items-start justify-center pt-12">
      <div className="bg-white rounded-lg shadow-lg px-6 w-[372px]">
        <div className="flex items-center pb-2 justify-between pt-6">
          <h2 className="font-semibold pl-0.5">Manage Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="my-6 rounded-b-lg flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="rounded-full border-0 bg-black-600"
          >
            Reset
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="rounded-full"
              onClick={() => btnRef.current?.click()}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
