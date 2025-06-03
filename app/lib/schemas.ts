import z from "zod";

const persianToEnglishNumbers = (input: string): string => {
  const numMap: { [key: string]: string } = {
    "\u06F0": "0",
    "\u06F1": "1",
    "\u06F2": "2",
    "\u06F3": "3",
    "\u06F4": "4",
    "\u06F5": "5",
    "\u06F6": "6",
    "\u06F7": "7",
    "\u06F8": "8",
    "\u06F9": "9",
  };

  return input.replace(/[\u06F0-\u06F9]/g, (match) => {
    return numMap[match] || match;
  });
};
export const UserInformationCartSchema = z.object({
  receiver_first_name: z
    .string()
    .trim()
    .min(3, {
      message: "لطفا نام خود را وارد نمایید",
    })
    .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
      message: "فقط کلمات فارسی مجاز هستند",
    }),
  receiver_last_name: z
    .string()
    .trim()
    .min(4, {
      message: "لطفا نام‌خانوادگی خود را وارد نمایید",
    })
    .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
      message: "فقط کلمات فارسی مجاز هستند",
    }),
  address: z
    .string()
    .trim()
    .min(10, {
      message: "لطفا آدرس خود را وارد نمایید",
    })
    .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
      message: "فقط کلمات فارسی مجاز هستند",
    }),
  zip: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: "کدپستی را وارد کنید",
    })
    .refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && value.replace(/\D/g, "").length === 10;
      },
      {
        message: "مقدار باید یک عدد معتبر باشد و دقیقاً ۱۰ رقم داشته باشد",
      }
    ),
  receiver_cell_phone_number: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: "شماره موبایل خود را وارد کنید",
    })
    .refine(
      (value) => {
        return /^(?:\+?98|0)?9\d{9}$/.test(value);
      },
      {
        message: "شماره موبایل اشتباه است",
      }
    ),
  province_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
  city_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
  shipping_method_id: z.object({
    value: z.number(),
    label: z.string(),
  }),
});


export const CreateChatRoomSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, {
      message: "لطفا عنوان خود را وارد نمایید",
    })
    .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
      message: "فقط کلمات فارسی مجاز هستند",
    }),
    message: z
    .string()
    .trim()
    .min(8, {
      message: "لطفا پیام خود را وارد نمایید",
    })
    .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
      message: "فقط کلمات فارسی مجاز هستند",
    }),
});


export const UserInformationInProfileSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(3, {
      message: "لطفا نام خود را وارد نمایید",
    })
    .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
      message: "فقط کلمات فارسی مجاز هستند",
    }),
  last_name: z
    .string()
    .trim()
    .min(4, {
      message: "لطفا نام‌خانوادگی خود را وارد نمایید",
    })
    .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
      message: "فقط کلمات فارسی مجاز هستند",
    }),
  province_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
  city_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
  landline_phone_number: z
    .string()
    .min(1, {
      message: "شماره تلفن ثابت خود را وارد کنید",
    })
    .transform(persianToEnglishNumbers)
    .refine((value) => /^0\d*$/.test(value), {
      message: "شماره تلفن ثابت با صفر آغاز می‌شود",
    }),
  email: z.string().email({ message: "فرمت ایمیل نامعتبر است" }),
});

export const CreateProductFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: "نام را وارد کنید",
  }),
  description: z.string().trim().min(1, {
    message: "توضیحات را وارد کنید",
  }),
  quantity: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: " موجودی را وارد کنید",
    }),
  min_order: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: " حداقل سفارش را وارد کنید",
    }),
  price: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: " قیمت را وارد کنید",
    }),
  pot_sizes_id_arr: z.array(
    z.object({
      value: z.number(),
      label: z.number(),
    })
  ),
  category_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
  product_type_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
  height: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: " اندازه را وارد کنید",
    }),
  is_for_sell: z.any(),
  is_for_auction: z.any(),
  is_for_tender: z.any(),
});


export const ShippingAddressSchema = z.object({
  receiver_first_name: z
    .string()
    .trim()
    .min(3, {
      message: "لطفا نام خود را وارد نمایید",
    })
    .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
      message: "فقط کلمات فارسی مجاز هستند",
    }),
  receiver_last_name: z
    .string()
    .trim()
    .min(4, {
      message: "لطفا نام‌خانوادگی خود را وارد نمایید",
    })
    .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
      message: "فقط کلمات فارسی مجاز هستند",
    }),
  address: z
    .string()
    .trim()
    .min(10, {
      message: "لطفا آدرس خود را وارد نمایید",
    })
    .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
      message: "فقط کلمات فارسی مجاز هستند",
    }),
  zip: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: "کدپستی را وارد کنید",
    })
    .refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && value.replace(/\D/g, "").length === 10;
      },
      {
        message: "مقدار باید یک عدد معتبر باشد و دقیقاً ۱۰ رقم داشته باشد",
      }
    ),
  receiver_cell_phone_number: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: "شماره موبایل خود را وارد کنید",
    })
    .refine(
      (value) => {
        return /^(?:\+?98|0)?9\d{9}$/.test(value);
      },
      {
        message: "شماره موبایل اشتباه است",
      }
    ),
  province_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
  city_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
});
export const CreateAuctionFormSchema = z.object({
  title: z.string().trim().min(1, {
    message: "عنوان را وارد کنید",
  }),
  description: z.string().trim().min(10, {
    message: "توضیحات را وارد کنید",
  }),
  quantity: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: " موجودی را وارد کنید",
    }),
  bid_min_increment: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: " حداقل افزایش پیشنهاد را وارد کنید",
    }),
  min_price: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: " قیمت را وارد کنید",
    }),
  max_user_request: z.any(),
  product_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
  bid_starts_at: z.string().trim().min(1, {
    message: "عنوان را وارد کنید",
  }),
  bid_ends_at: z.string().trim().min(1, {
    message: "عنوان را وارد کنید",
  }),
});
export const CreateTenderFormSchema = z.object({
  title: z.string().trim().min(1, {
    message: "عنوان را وارد کنید",
  }),
  description: z.string().trim().min(10, {
    message: "توضیحات را وارد کنید",
  }),
  quantity: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: " موجودی را وارد کنید",
    }),
  bid_min_decrement: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: " حداقل افزایش پیشنهاد را وارد کنید",
    }),
  max_price: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: " قیمت را وارد کنید",
    }),
  max_user_request: z.any(),
  product_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
  bid_starts_at: z.string().trim().min(1, {
    message: "عنوان را وارد کنید",
  }),
  bid_ends_at: z.string().trim().min(1, {
    message: "عنوان را وارد کنید",
  }),
});

export const suggestFormSchema = z.object({
  amount: z.any(),
  auctionId: z.any(),
  shipping_address_id: z.object({
    value: z.string(),
    label: z.string(),
  }),
});
