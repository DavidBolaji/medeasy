import React, { HTMLAttributes, InputHTMLAttributes } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useField, useFormikContext } from 'formik';
import { cn } from '@/app/_lib/utils';

interface FormikCheckboxProp extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

const FormikCheckbox: React.FC<FormikCheckboxProp> = ({ label, name }) => {
  const [props] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className="flex items-center">
      <Checkbox
        checked={props.value}
        onCheckedChange={(val: boolean) => setFieldValue(name, val)}
        className={cn('data-[state=checked]:text-white ')}
      />
      {label ? (
        <Label
          className="text-[#141923] ml-2 translate-y-1 font-instrument font-normal text-small mb-2 inline-block"
          htmlFor={'negotiable'}
        >
          {label}
        </Label>
      ) : null}
    </div>
  );
};

export default FormikCheckbox;
