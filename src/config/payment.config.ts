/**
 * Payment methods and bank details. Move to env or CMS when going to production.
 */
import qrCodeImage from "@/images/QR-code.jpg";

export interface PaymentConfig {
  paypal: {
    url: string;
    email: string;
    label: string;
  };
  momo: {
    url: string;
    label: string;
  };
  bank: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    swift: string;
    currency: string;
    qrCodeUrl: string;
  };
}

export const PAYMENT_CONFIG: PaymentConfig = {
  paypal: {
    url: "https://paypal.me/Xuan123hv",
    email: "Xuan123hv@gmail.com",
    label: "PayPal",
  },
  momo: {
    url: "https://me.momo.vn/xuansongsky",
    label: "Momo",
  },
  bank: {
    accountName: "PHUNG THI XUAN",
    accountNumber: "1638544056870",
    bankName: "MB Bank – MB Hải Châu",
    swift: "MSCBVNVX",
    currency: "VND",
    qrCodeUrl: qrCodeImage,
  },
};
