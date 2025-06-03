"use client";

import {
  InputLabel,
  Button,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import * as XLSX from "xlsx";

interface CustomExcelUploaderProps {
  onJsonReady: (json: any[]) => void;
}

export const CustomExcelUploader: React.FC<CustomExcelUploaderProps> = ({
  onJsonReady,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setParsedData([]);

    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["xlsx", "csv"];

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setError("فقط فایل با فرمت CSV یا Excel مجاز است.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (!result) {
        setError("خطا در خواندن فایل.");
        return;
      }

      try {
        const data = new Uint8Array(result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        setParsedData(jsonData);
        onJsonReady(jsonData);
      } catch {
        setError("خواندن فایل با مشکل مواجه شد.");
      }
    };

    reader.onerror = () => {
      setError("خواندن فایل با مشکل مواجه شد.");
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Box className="mb-4">
      <InputLabel className="mb-2 block text-right">فایل Excel</InputLabel>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ textAlign: "right", direction: "rtl" }}
      >
        انتخاب فایل Excel
        <input
          type="file"
          accept=".csv, .xlsx"
          hidden
          onChange={handleExcelUpload}
        />
      </Button>

      {error && (
        <FormHelperText error className="text-right mt-1">
          {error}
        </FormHelperText>
      )}

      {parsedData.length > 0 && (
        <Box className="mt-4 border p-2 rounded bg-gray-50 max-h-64 overflow-y-auto">
          <Typography variant="subtitle2" className="mb-2 text-right">
            پیش‌نمایش داده‌ها:
          </Typography>
          <table className="text-sm w-full rtl text-right">
            <thead>
              <tr>
                {Object.keys(parsedData[0]).map((key) => (
                  <th key={key} className="border p-1 bg-gray-200">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, cellIndex) => (
                    <td key={cellIndex} className="border p-1">
                      {value as string}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  );
};
