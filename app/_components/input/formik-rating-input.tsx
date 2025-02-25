'use client';
import { useField, useFormikContext } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { Label } from '../ui/label';

import { Rate } from 'antd';
import { Star, StarIcon } from 'lucide-react';

interface FormikRatingInputProp extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormikRatingInput: React.FC<FormikRatingInputProp> = ({
  name,
  label,
  disabled,
  ...rest
}) => {
  const [props] = useField(name as string);
  const { className, placeholder, ...prop } = rest;
  const { setFieldValue } = useFormikContext();

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
      <Rate
        character={<Star className="" size={32} />}
        allowHalf
        defaultValue={Number(props.value) || 0}
        onChange={(val: number) => setFieldValue(name as string, val)}
        value={props.value}
        disabled={disabled}
      />
    </div>
  );
};

export default FormikRatingInput;
