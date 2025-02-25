'use client';
import { useField, useFormikContext } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import ReactQuill from 'react-quill-new';
import { Label } from '../ui/label';
import { cn } from '@/app/_lib/utils';
import { modules } from '@/app/_lib/data';
import 'react-quill-new/dist/quill.snow.css';

interface FormikFormatedTextAreaProp
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
}

const FormikFormatedTextArea: React.FC<FormikFormatedTextAreaProp> = ({
  name,
  label,
  disabled = false,
  ...rest
}) => {
  const [props] = useField(name as string);
  const { className, placeholder } = rest;
  const { setFieldValue } = useFormikContext();

  return (
    <div className="">
      {label ? (
        <Label
          className="text-[#141923] ml-0.5 font-instrument font-semibold text-base mb-2 inline-block"
          htmlFor={name}
        >
          {label}
        </Label>
      ) : null}
      <ReactQuill
        modules={modules}
        placeholder={placeholder}
        theme="snow"
        value={props.value}
        readOnly={disabled}
        // onBlur={props.onBlur}
        // onChangeSelection={props.onChange}
        className={cn(
          'border-[#5C698A] focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none font-instrument rounded-2xl bg-transparent',
          className
        )}
        onChange={(e: string) => setFieldValue(name!, e)}
      />
    </div>
  );
};

export default FormikFormatedTextArea;
