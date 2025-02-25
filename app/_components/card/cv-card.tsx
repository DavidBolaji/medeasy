import React from 'react';
import Typography from '../typography/typography';
import { Download } from 'lucide-react';
import Link from 'next/link';

interface CVCardProps {
  cvUrl: string;
}

export default function CVCard({ cvUrl }: CVCardProps) {
  if (!cvUrl) return null; // Hide if no CV provided

  // Extract file name and extension
  const fileName = cvUrl.split('/').pop() || 'CV';
  const fileExtension = fileName.split('.').pop()?.toUpperCase() || '';
  const truncatedName =
    fileName.length > 20 ? fileName.slice(0, 17) + '...' : fileName;

  return (
    <div className="h-20 w-96">
      <Link
        href={cvUrl}
        download
        className="flex items-center justify-between w-full bg-white h-full transition p-3 rounded-lg shadow cursor-pointer"
      >
        {/* File Extension */}
        <span className="text-gray-700 font-bold w-12 flex items-center justify-center h-full">
          {fileExtension}
        </span>

        {/* Truncated File Name */}
        <span className="text-gray-900 ml-4 truncate w-full">
          {truncatedName}
        </span>

        {/* Download Icon */}
        <div className="mr-2">
          <Download className="text-blue-500 text-lg w-full" />
        </div>
      </Link>
    </div>
  );
}
