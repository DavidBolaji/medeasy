'use client';
import { useField, useFormikContext } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { format, getDaysInMonth, setMonth, setYear } from 'date-fns';

import { Label } from '../ui/label';
import { cn } from '@/app/_lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface FormikCalenderInputProp
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormikCalenderInput: React.FC<FormikCalenderInputProp> = ({
  name,
  label,
  ...rest
}) => {
  const [props] = useField(name as string);
  const { className, placeholder, ...prop } = rest;
  const { setFieldValue } = useFormikContext();

  const handleChange = (e: any, d: any, f: any) => {
    let currentDate = new Date();
    if (props.value) {
      currentDate = new Date(props.value);
    }

    if (isNaN(currentDate.getTime())) {
      setFieldValue(name!, e.toISOString());
      return;
    }

    // Preserve the selected date but update month/year accordingly
    const updatedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      e.getDate()
    );

    setFieldValue(name!, updatedDate.toISOString());
    // setFieldValue(name!, e.toLocaleString());
  };

  const handleYear = (year: string) => {
    let currentDate = new Date();
    if (props.value) {
      currentDate = new Date(props.value);
    }

    if (isNaN(currentDate.getTime())) return;

    const updatedDate = setYear(currentDate, parseInt(year));

    // Ensure the day exists in the target month (e.g., Feb 30 -> Feb 28)
    const maxDays = getDaysInMonth(updatedDate);
    updatedDate.setDate(Math.min(currentDate.getDate(), maxDays));

    setFieldValue(name!, updatedDate.toISOString());
  };

  const handleMonth = (month: string) => {
    if (!props.value) return;

    let currentDate = new Date(props.value);
    if (isNaN(currentDate.getTime())) return;

    const updatedDate = setMonth(currentDate, parseInt(month));

    // Ensure the selected day exists in the new month
    const maxDays = getDaysInMonth(updatedDate);
    updatedDate.setDate(Math.min(currentDate.getDate(), maxDays));

    setFieldValue(name!, updatedDate.toISOString());
  };

  const isFilled = props.value.toString().length > 0;
  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const maxYear = currentYear + 50; // Limit max year

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
      <Popover>
        <PopoverTrigger
          className="w-full focus:outline-none focus:border-0"
          asChild
        >
          <div
            className={cn(
              'border-[#5C698A] h-[52px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible::outline-none font-instrument rounded-2xl bg-transparent',
              className
            )}
          >
            <Button
              variant={'outline'}
              type="button"
              className={cn(
                'w-full pl-3 text-left hover:border-[#5C698A] font-normal rounded-2xl',
                !prop.value && 'text-muted-foreground'
              )}
            >
              {isFilled ? format(props.value, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="end">
          <Calendar
            key={props.value || ''}
            className="bg-white"
            mode="single"
            showOutsideDays={false}
            selected={new Date(props.value)}
            onSelect={handleChange}
            components={{
              Caption: () => {
                return (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      {/* Year Selection */}
                      <Select
                        value={
                          props.value && !isNaN(new Date(props.value).getTime())
                            ? new Date(props.value).getFullYear().toString()
                            : currentYear.toString() // Fallback to current year
                        }
                        onValueChange={(year) => {
                          handleYear(year);
                        }}
                      >
                        <SelectTrigger className="h-8 w-[100px] bg-transparent">
                          <SelectValue>
                            {props.value &&
                            !isNaN(new Date(props.value).getTime())
                              ? new Date(props.value).getFullYear()
                              : currentYear}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: maxYear - minYear + 1 },
                            (_, i) => minYear + i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Month Selection */}
                      <Select
                        value={
                          props.value && !isNaN(new Date(props.value).getTime())
                            ? new Date(props.value).getMonth().toString()
                            : '0' // Default to January if invalid
                        }
                        onValueChange={(month) => {
                          handleMonth(month);
                        }}
                      >
                        <SelectTrigger className="h-8 w-[120px] bg-transparent">
                          <SelectValue>
                            {props.value &&
                            !isNaN(new Date(props.value).getTime())
                              ? new Date(props.value).toLocaleString(
                                  'default',
                                  { month: 'long' }
                                )
                              : new Date().toLocaleString('default', {
                                  month: 'long',
                                })}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {new Date(0, i).toLocaleString('default', {
                                month: 'long',
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                );
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FormikCalenderInput;

// ('use client');
// import { useField, useFormikContext } from 'formik';
// import React, { InputHTMLAttributes, useState } from 'react';
// import { format } from 'date-fns';

// import { Label } from '../ui/label';
// import { cn } from '@/app/_lib/utils';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { Calendar } from '../ui/calendar';
// import { Button } from '../ui/button';
// import { CalendarIcon } from 'lucide-react';

// const FormikCalenderInput: React.FC<FormikCalenderInputProp> = ({
//   name,
//   label,
//   ...rest
// }) => {
//   const [props] = useField(name as string);
//   const { className, placeholder, ...prop } = rest;
//   const { setFieldValue } = useFormikContext();

//   const handleChange = (e: any, d: any, f: any) => {
//     setFieldValue(name!, e.toLocaleString());
//   };

//   const isFilled = props.value.toString().length > 0;

//   return (
//     <div>
//       {label ? (
//         <Label
//           className="text-[#141923] ml-0.5 font-instrument font-semibold text-base mb-2 inline-block"
//           htmlFor={name}
//         >
//           {label}
//         </Label>
//       ) : null}
//       <Popover>
//         <PopoverTrigger
//           className="w-full focus:outline-none focus:border-0"
//           asChild
//         >
//           <div
//             className={cn(
//               'border-[#5C698A] h-[52px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible::outline-none font-instrument rounded-2xl bg-transparent',
//               className
//             )}
//           >
//             <Button
//               variant={'outline'}
//               type="button"
//               className={cn(
//                 'w-full pl-3 text-left hover:border-[#5C698A] font-normal rounded-2xl',
//                 !prop.value && 'text-muted-foreground'
//               )}
//             >
//               {isFilled ? format(props.value, 'PPP') : <span>Pick a date</span>}
//               <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//             </Button>
//           </div>
//         </PopoverTrigger>
//         <PopoverContent className="w-full p-0" align="end">
//           <Calendar
//             className="bg-white"
//             mode="single"
//             selected={new Date(props.value)}
//             onSelect={handleChange}
//             // disabled={(date) =>
//             //   date > new Date() || date < new Date('1900-01-01')
//             // }
//             // initialFocus
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// export default FormikCalenderInput;

// interface FormikCalenderInputProp
//   extends InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
// }

// const FormikCalendarInput: React.FC<FormikCalenderInputProp> = ({
//   name,
//   label,
//   ...rest
// }) => {
//   const [props] = useField(name as string);
//   const { className, ...prop } = rest;
//   const { setFieldValue } = useFormikContext();

//   // Ensure controlled component behavior
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
//     props.value ? new Date(props.value) : undefined
//   );

//   // Handle date selection
//   const handleChange = (date: Date | undefined) => {
//     if (date) {
//       setSelectedDate(date);
//       setFieldValue(name!, date.toISOString());
//     }
//   };

//   // Ensure calendar updates correctly when year/month change
//   const updateSelectedDate = (year: number, month: number) => {
//     setSelectedDate((prev) => {
//       const newDate = new Date(prev || new Date());
//       newDate.setFullYear(year);
//       newDate.setMonth(month);
//       return newDate;
//     });
//   };

//   const isFilled = !!selectedDate;
//   const currentYear = new Date().getFullYear();
//   const minYear = 1900;
//   const maxYear = currentYear + 50; // Limit max year

//   return (
//     <div>
//       {label && (
//         <Label
//           className="text-[#141923] ml-0.5 font-instrument font-semibold text-base mb-2 inline-block"
//           htmlFor={name}
//         >
//           {label}
//         </Label>
//       )}
//       <Popover>
//         <PopoverTrigger
//           className="w-full focus:outline-none focus:border-0"
//           asChild
//         >
//           <div
//             className={cn(
//               'border-[#5C698A] h-[52px] focus-visible:ring-0 focus-visible:ring-offset-0 font-instrument rounded-2xl bg-transparent',
//               className
//             )}
//           >
//             <Button
//               variant={'outline'}
//               type="button"
//               className={cn(
//                 'w-full pl-3 text-left hover:border-[#5C698A] font-normal rounded-2xl',
//                 !selectedDate && 'text-muted-foreground'
//               )}
//             >
//               {selectedDate ? (
//                 format(selectedDate, 'PPP')
//               ) : (
//                 <span>Pick a date</span>
//               )}
//               <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//             </Button>
//           </div>
//         </PopoverTrigger>
//         <PopoverContent className="w-full p-0" align="end">
//           <Calendar
//             className="rounded-md border bg-white p-3"
//             mode="single"
//             selected={selectedDate}
//             onSelect={handleChange}
//             fromYear={minYear}
//             toYear={maxYear}
//             components={{
//               Caption: () => {
//                 const safeDate = selectedDate || new Date();

//                 return (
//                   <div className="flex flex-col gap-2">
//                     <div className="flex items-center justify-between gap-2">
//                       {/* Year Selection */}
//                       <Select
//                         value={safeDate.getFullYear().toString()}
//                         onValueChange={(year) => {
//                           updateSelectedDate(
//                             Number.parseInt(year),
//                             safeDate.getMonth()
//                           );
//                         }}
//                       >
//                         <SelectTrigger className="h-8 w-[100px] bg-transparent">
//                           <SelectValue>{safeDate.getFullYear()}</SelectValue>
//                         </SelectTrigger>
//                         <SelectContent>
//                           {Array.from(
//                             { length: maxYear - minYear + 1 },
//                             (_, i) => minYear + i
//                           ).map((year) => (
//                             <SelectItem key={year} value={year.toString()}>
//                               {year}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>

//                       {/* Month Selection */}
//                       <Select
//                         value={safeDate.getMonth().toString()}
//                         onValueChange={(month) => {
//                           updateSelectedDate(
//                             safeDate.getFullYear(),
//                             Number.parseInt(month)
//                           );
//                         }}
//                       >
//                         <SelectTrigger className="h-8 w-[120px] bg-transparent">
//                           <SelectValue>
//                             {safeDate.toLocaleString('default', {
//                               month: 'long',
//                             })}
//                           </SelectValue>
//                         </SelectTrigger>
//                         <SelectContent>
//                           {Array.from({ length: 12 }, (_, i) => (
//                             <SelectItem key={i} value={i.toString()}>
//                               {new Date(0, i).toLocaleString('default', {
//                                 month: 'long',
//                               })}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 );
//               },
//             }}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// export default FormikCalendarInput;

{
  /* <Calendar
            className="bg-white"
            mode="single"
            selected={props.value ? new Date(props.value) : undefined}
            onSelect={handleChange}
            fromYear={1900} // Enables year selection from 1900
            toYear={new Date().getFullYear() + 50} // Allows up to the current year
            captionLayout="dropdown-buttons" // Enables month and year dropdowns
          /> */
}
