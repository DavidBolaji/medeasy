'use client';
import React from 'react';
import { Plus, X } from 'lucide-react';
import { servicesList } from '@/app/_lib/data';
import FormikSelectInput from '@/app/_components/input/formik-select-input';
import { Button } from '@/app/_components/ui/button';

interface ServiceNeededFieldProps {
  index: number;
  isLast: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

const ServiceNeededField: React.FC<ServiceNeededFieldProps> = ({
  index,
  isLast,
  onAdd,
  onRemove,
}) => (
  <div className="relative rounded-2xl">
    <div className="space-y-6">
      <FormikSelectInput
        options={servicesList}
        label="What kind of help do you need?"
        name={`services[${index}].name`}
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
          className="absolute w-4 h-4 border-0 p-0 -top-5 right-1"
        >
          <X />
        </Button>
      )}
    </div>
  </div>
);

export default ServiceNeededField;
