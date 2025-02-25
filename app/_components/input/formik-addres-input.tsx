'use client';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

import { Label } from '../ui/label';
import FormikInput from './formik-input';
import FormikSelectInput from './formik-select-input';
import useAddress from '@/app/_hooks/use-address';

interface FormikAddressInputProp extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  country: string;
  state: string;
  address: string;
  street: string;
  other: string;
}

const FormikAddressInput: React.FC<FormikAddressInputProp> = ({
  address,
  country,
  state,
  street,
  other,
  label,
  ...rest
}) => {
  const { states, countries, getStates } = useAddress();

  const [adr] = useField(address);
  const [ctry] = useField(country);
  const [st] = useField(state);
  const [str] = useField(street);
  const [oth] = useField(other);
  const { className, placeholder, ...prop } = rest;

  return (
    <div>
      {label ? (
        <Label
          className="text-[#141923] ml-0.5 font-instrument font-semibold text-base mb-2 inline-block"
          htmlFor={address}
        >
          {label}
        </Label>
      ) : null}
      <div className="space-y-4 w-full">
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <FormikInput placeholder="House number" {...adr} name={address} />
          </div>
          <div className="w-full">
            <FormikInput placeholder="Street" {...str} name={street} />
          </div>
        </div>
        <div>
          <FormikInput placeholder="Other" {...oth} name={other} />
        </div>
        <div className="flex w-full gap-3">
          <div className="w-full">
            <FormikSelectInput
              placeholder="Country"
              {...ctry}
              name={country}
              options={countries || []}
              handleChange={(e) => getStates(e)}
            />
          </div>
          <div className="w-full">
            <FormikSelectInput
              placeholder="State"
              {...st}
              name={state}
              options={
                (states as unknown as { label: string; key: string }[]) || []
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormikAddressInput;
