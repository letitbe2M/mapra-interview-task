"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import CustomImageUploader from "./_components/CustomImageUploader";
import { CustomExcelUploader } from "./_components/CustomExcelUploader";

const schema = z.object({
  firstname: z.string().min(1, "نام الزامی است"),
  lastname: z.string().min(1, "نام خانوادگی الزامی است"),
  email: z.string().email("ایمیل معتبر نیست"),
  profileImage: z.any(),
  excelData: z
    .array(z.record(z.string(), z.any()))
    .min(1, "فایل اکسل نامعتبر است"),
});

type FormData = z.infer<typeof schema>;

export default function ProfileForm() {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      excelData: [],
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log({ data });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Box
      dir="rtl"
      className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow"
    >
      <Typography variant="h5" className="mb-6 text-center font-bold">
        فرم پروفایل
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <TextField
          label="نام"
          fullWidth
          {...register("firstname")}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
        />
        <TextField
          label="نام خانوادگی"
          fullWidth
          {...register("lastname")}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
        />
        <TextField
          label="ایمیل"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <CustomImageUploader
          label="تصویر پروفایل"
          value={watch("profileImage")}
          onChange={(fileList) => setValue("profileImage", fileList!)}
        />
        <CustomExcelUploader
          onJsonReady={(jsonData) => {
            setValue("excelData", jsonData);
            trigger("excelData");
          }}
        />

        {errors.excelData && (
          <Typography color="error" fontSize={14}>
            {errors.excelData.message}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "ارسال فرم"
          )}
        </Button>

        {submitted && !loading && (
          <Typography
            variant="subtitle1"
            className="text-green-600 text-center mt-4"
          >
            فرم با موفقیت ارسال شد!
          </Typography>
        )}
      </form>
    </Box>
  );
}
