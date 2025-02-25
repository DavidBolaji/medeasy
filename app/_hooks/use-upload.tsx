import { useState } from 'react';
import { validateFileSize, validateFileType } from '../_lib/utils';
import { useNotification } from './use-notification';

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toggleNotification } = useNotification();

  const handleUpload = async (
    file: File,
    setFieldValue: (field: string, value: any) => void,
    name: string
  ) => {
    try {
      // Validate file type
      validateFileType(file.type);
      // Validate file size (5MB)
      validateFileSize(file.size);
      // upload starting
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setFieldValue(name, data.secure_url);
      }
      toggleNotification({
        type: 'success',
        message: 'File uploaded successfully',
        title: 'Upload Successs',
        show: true,
      });
    } catch (error) {
      // handle error
      toggleNotification({
        type: 'error',
        message: (error as Error).message,
        title: 'Upload Error',
        show: true,
      });
      console.log((error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return { handleUpload, isUploading };
};

export default useUpload;
