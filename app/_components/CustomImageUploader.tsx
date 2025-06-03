"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { InputLabel, FormHelperText, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FieldError } from "react-hook-form";

type Props = {
  onChange: (file: FileList | null) => void;
  error?: FieldError;
  label?: string;
  value?: FileList | null;
};

export default function CustomImageUploader({
  onChange,
  error,
  label = "تصویر پروفایل",
  value,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value && value.length > 0) {
      const file = value[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(acceptedFiles[0]);
      onChange(dataTransfer.files);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className="space-y-1">
      <InputLabel className="mb-1">{label}</InputLabel>

      {previewUrl ? (
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
          <img
            src={previewUrl}
            alt="پیش‌نمایش"
            className="object-cover w-full h-full"
          />
          <IconButton
            size="small"
            className="absolute top-0 left-0 text-white bg-black bg-opacity-50 hover:bg-opacity-80 m-1"
            onClick={handleRemove}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`flex items-center justify-center w-full h-32 px-4 text-center text-gray-500 transition bg-gray-50 border-2 border-dashed rounded-lg cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-sm">برای آپلود، تصویر را بکشید یا کلیک کنید</p>
        </div>
      )}

      {previewUrl && (
        <div className="pt-2">
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleRemove}
          >
            حذف تصویر
          </Button>
        </div>
      )}

      {error && (
        <FormHelperText error className="text-sm mt-1">
          {error.message === "Expected FileList, received undefined"
            ? "لطفاً یک تصویر معتبر انتخاب کنید"
            : error.message}
        </FormHelperText>
      )}
    </div>
  );
}
