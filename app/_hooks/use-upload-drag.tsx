import React, { useCallback, useState } from 'react';

const useUploadDrag = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (
      e: React.DragEvent,
      setFieldValue: (field: string, value: any) => void,
      handleUpload: (
        file: File,
        setFieldValue: (field: string, value: any) => void,
        name: string
      ) => void,
      name: string
    ) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleUpload(file, setFieldValue, name);
      }
    },
    []
  ); // Added handleUpload to dependencies

  return { handleDrag, handleDrop, isDragging };
};

export default useUploadDrag;
