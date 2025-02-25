'use client';
import { useField } from 'formik';
import React, { TextareaHTMLAttributes } from 'react';
import { Label } from '../ui/label';
import { cn } from '@/app/_lib/utils';
import { Textarea } from '../ui/textarea';

interface FormikTextareaProp
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const FormikTextarea: React.FC<FormikTextareaProp> = ({
  name,
  label,
  ...rest
}) => {
  const [props] = useField(name as string);
  const { className, placeholder, ...prop } = rest;

  return (
    <div>
      {label ? (
        <Label
          className="text-[#141923] ml-0.5 font-instrument font-semibold text-base mb-2 inline-block"
          htmlFor={name}
        >
          {label}
        </Label>
      ) : null}
      <Textarea
        {...props}
        {...prop}
        placeholder={placeholder || label || ''}
        className={cn(
          'border-[#5C698A] h-[52px] focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none font-instrument rounded-2xl bg-transparent',
          className
        )}
      />
    </div>
  );
};

export default FormikTextarea;
