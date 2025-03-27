'use client';

import { Upload, Loader2 } from 'lucide-react';

import { cn } from '@/app/_lib/utils';
import useUpload from '@/app/_hooks/use-upload';
import useUploadDrag from '@/app/_hooks/use-upload-drag';
import { useFormikContext } from 'formik';
import { Label } from '../ui/label';
import { HTMLAttributes } from 'react';

const Uploading = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <p className="text-sm text-gray-500">Uploading...</p>
    </div>
  );
};

interface IFormikUploadProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  label?: string;
  txt?: string;
  uploadTxt: string;
}

const FormikUpload: React.FC<IFormikUploadProps> = ({
  name,
  label = undefined,
  txt,
  uploadTxt = 'CV uploaded successfully',
  ...rest
}) => {
  //handle upload
  const { isUploading, handleUpload } = useUpload();
  // handle drag
  const { isDragging, handleDrag, handleDrop } = useUploadDrag();
  // formik context
  const { setFieldValue, getFieldProps } = useFormikContext();
  // formik value
  const { value } = getFieldProps(name);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {label?.length ? (
        <Label
          className="text-[#141923] ml-1  font-instrument font-semibold text-base mb-2 inline-block"
          htmlFor={name}
        >
          {label || 'Do you have a CV?'}
        </Label>
      ) : null}

      <div>
        <div
          className={cn(
            'relative border-2 border-dashed rounded-2xl',
            'flex flex-col items-center justify-center gap-4',
            'min-h-[100px] cursor-pointer transition-colors',
            isDragging
              ? 'border-blue-50 bg-blue-50'
              : 'border-gray-300 bg-blue-50',
            'hover:border-blue-200 hover:bg-blue-50',
            rest.className
          )}
          onDragEnter={(e) => handleDrag(e)}
          onDragLeave={(e) => handleDrag(e)}
          onDragOver={(e) => handleDrag(e)}
          onDrop={(e) => handleDrop(e, setFieldValue, handleUpload, name)}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.png,.jpg,.jpeg,.pdf';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                handleUpload(file, setFieldValue, name);
              }
            };
            input.click();
          }}
        >
          {isUploading ? (
            <Uploading />
          ) : value ? (
            <div className="flex flex-col items-center gap-2">
              <div className="text-green-500">✓</div>
              <p className="text-sm text-gray-500">{uploadTxt}</p>
              <button
                type="button"
                className="text-sm text-blue-500 hover:text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setFieldValue(name, '');
                }}
              >
                Upload a different file
              </button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="text-lg font-medium">{txt || 'Upload CV'}</p>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPEG, PDF not more than 5mb in size.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormikUpload;
