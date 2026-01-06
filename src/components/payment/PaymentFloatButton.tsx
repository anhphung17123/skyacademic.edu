import { useState } from "react";
import { CreditCard, Heart } from "lucide-react";
import { PaymentModal } from "./PaymentModal";
import { clsx } from "clsx";

interface PaymentFloatButtonProps {
  isDonation?: boolean;
  className?: string;
}

export const PaymentFloatButton = ({
  isDonation = false,
  className,
}: PaymentFloatButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 z-50",
          "w-14 h-14 rounded-full shadow-2xl",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-110 active:scale-95",
          "lg:hidden", // Only show on mobile/tablet
          isDonation
            ? "bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            : "bg-gradient-to-br from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white",
          className
        )}
        aria-label={isDonation ? "Support & Donation" : "Payment"}
      >
        {isDonation ? (
          <Heart className="w-6 h-6 fill-current" />
        ) : (
          <CreditCard className="w-6 h-6" />
        )}
      </button>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDonation={isDonation}
      />
    </>
  );
};

