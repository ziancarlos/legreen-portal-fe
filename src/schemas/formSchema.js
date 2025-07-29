import { z } from "zod";

// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?:62|0)?8[0-9]{9,12}$/;

// Customer step validation schema
export const customerSchema = z
  .object({
    lokasiLeGreen: z.string().min(1, "Lokasi LeGreen is required"),
    nama: z.string().min(1, "Nama (Sesuai KTP/Passport) is required"),
    alamatEmail: z
      .string()
      .optional()
      .refine((val) => {
        if (!val || val === "") return true;
        return emailRegex.test(val);
      }, "Please enter a valid email address"),
    telephone: z
      .string()
      .min(1, "Telephone is required")
      .refine((val) => {
        return phoneRegex.test(val);
      }, "Please enter a valid Indonesian phone number"),
    darimanaAndaMengetahuiKami: z
      .string()
      .min(1, "Please select how you heard about us"),
    needEmergencyContact: z.boolean(),
    emergencyContactName: z.string().optional(),
    emergencyContactPhone: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.needEmergencyContact) {
        return (
          data.emergencyContactName && data.emergencyContactName.length > 0
        );
      }
      return true;
    },
    {
      message:
        "Emergency contact name is required when emergency contact is needed",
      path: ["emergencyContactName"],
    }
  )
  .refine(
    (data) => {
      if (data.needEmergencyContact) {
        return (
          data.emergencyContactPhone &&
          phoneRegex.test(data.emergencyContactPhone)
        );
      }
      return true;
    },
    {
      message:
        "Valid emergency contact phone is required when emergency contact is needed",
      path: ["emergencyContactPhone"],
    }
  );

// Officer step validation schema
export const officerSchema = z
  .object({
    tanggalWaktuCheckin: z
      .string()
      .min(1, "Tanggal waktu check-in is required"),
    tanggalWaktuCheckout: z
      .string()
      .min(1, "Tanggal waktu check-out is required"),
    nomorKamar: z.string().min(1, "Nomor kamar is required"),
    jumlahTamu: z
      .number()
      .min(1, "Jumlah tamu must be at least 1")
      .max(10, "Maximum 10 guests allowed"),
    penerimaTamu: z.string().min(1, "Penerima tamu is required"),
  })
  .refine(
    (data) => {
      const checkinDate = new Date(data.tanggalWaktuCheckin);
      const now = new Date();
      return checkinDate > now;
    },
    {
      message: "Check-in date must be in the future",
      path: ["tanggalWaktuCheckin"],
    }
  )
  .refine(
    (data) => {
      const checkinDate = new Date(data.tanggalWaktuCheckin);
      const checkoutDate = new Date(data.tanggalWaktuCheckout);
      return checkoutDate > checkinDate;
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["tanggalWaktuCheckout"],
    }
  );

// Combined schema for final submission
export const completeFormSchema = customerSchema.merge(officerSchema);
