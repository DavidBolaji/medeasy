'use client';

import { cn } from '@/app/_lib/utils';
import { useField, useFormikContext } from 'formik';
import { Plus, X } from 'lucide-react';
import { Label } from '../ui/label';

interface FormikServiceProps {
  services: string[];
  name: string;
}

const FormikServices: React.FC<FormikServiceProps> = ({ services, name }) => {
  const [props] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className="w-full mx-auto pt-4">
      <Label
        className="text-[#141923] font-instrument font-semibold text-base mb-4 inline-block"
        htmlFor={name}
      >
        What services do you offer?
      </Label>

      <div>
        <div className="flex flex-wrap gap-4">
          {services.map((service) => {
            const isSelected = props.value.includes(service);

            const toggleService = () => {
              const newServices = isSelected
                ? props.value.filter((s: string) => s !== service)
                : [...props.value, service];

              setFieldValue(name, newServices);
            };

            return (
              <button
                key={service}
                type="button"
                onClick={toggleService}
                className={cn(
                  'flex items-center text-sm gap-2 px-3 py-2 rounded-full transition-colors',
                  'bg-blue-50 hover:bg-blue-100',
                  isSelected && 'bg-blue-100'
                )}
              >
                <span>{service}</span>
                {isSelected ? (
                  <X className="h-4 w-4 text-blue-600" />
                ) : (
                  <Plus className="h-4 w-4 text-blue-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormikServices;
