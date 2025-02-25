'use client';
import React from 'react';
import { Plus, X } from 'lucide-react';
import { servicesList } from '@/app/_lib/data';
import FormikSelectInput from '@/app/_components/input/formik-select-input';
import FormikInput from '@/app/_components/input/formik-input';
import FormikTextarea from '@/app/_components/input/formik-textarea';
import { Button } from '@/app/_components/ui/button';

interface ServiceFieldProps {
  index: number;
  isLast: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

const ServiceField: React.FC<ServiceFieldProps> = ({
  index,
  isLast,
  onAdd,
  onRemove,
}) => (
  <div className="relative p-6 rounded-2xl bg-blue-50">
    <div className="space-y-6">
      <FormikSelectInput
        options={servicesList}
        label="What service do you offer"
        name={`services[${index}].name`}
      />
      <FormikInput
        label="How many years of experience do you have doing this"
        name={`services[${index}].duration`}
        placeholder="Years of experience"
        type="text"
      />
      <FormikTextarea
        label="Tell us more about your experience"
        placeholder="Your experience"
        name={`services[${index}].experience`}
      />

      {isLast && (
        <Button
          onClick={onAdd}
          className="flex hover:bg-transparent hover:text-black bg-transparent rounded-lg items-center justify-end ml-auto"
        >
          <Plus />
          Add a service
        </Button>
      )}

      {index > 0 && (
        <Button
          onClick={onRemove}
          className="absolute w-4 h-4 border-0 p-0 top-1.5 right-6"
        >
          <X />
        </Button>
      )}
    </div>
  </div>
);

export default ServiceField;
