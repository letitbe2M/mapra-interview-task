import z from "zod";

export const profileSchema = z.object({
  firstname: z.string().min(1, "نام الزامی است"),
  lastname: z.string().min(1, "نام خانوادگی الزامی است"),
  email: z.string().email("ایمیل معتبر نیست"),
  profileImage: z.any(),
  excelData: z
    .array(z.record(z.string(), z.any()))
    .min(1, "فایل اکسل نامعتبر است"),
});