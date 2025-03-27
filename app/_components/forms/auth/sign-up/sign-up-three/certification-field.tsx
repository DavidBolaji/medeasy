'use client';
import FormikInput from '@/app/_components/input/formik-input';
import FormikUpload from '@/app/_components/input/formik-upload-input';
import { Button } from '@/app/_components/ui/button';
import { Plus, X } from 'lucide-react';
import React from 'react';

interface CertificationFieldProps {
  index: number;
  isLast: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

const CertificationField: React.FC<CertificationFieldProps> = ({
  index,
  isLast,
  onAdd,
  onRemove,
}) => (
  <div className="relative p-6 rounded-2xl bg-blue-50">
    <div className="space-y-6">
      <FormikUpload
        label="If you are medically trained, upload your certification"
        name={`certifications[${index}].certificate`}
        className="bg-white"
        txt="Upload Certificate"
        uploadTxt="Certificate uploaded successfully"
      />
      <FormikInput
        label="Certification name"
        name={`certifications[${index}].name`}
        placeholder="Certification name"
        type="text"
        className="bg-white"
      />

      {isLast && (
        <Button
          onClick={onAdd}
          className="flex hover:bg-transparent hover:text-black bg-transparent rounded-lg items-center justify-end ml-auto"
        >
          <Plus />
          Add a certification
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

export default CertificationField;
