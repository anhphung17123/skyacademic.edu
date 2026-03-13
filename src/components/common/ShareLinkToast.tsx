import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ShareLinkToastProps {
  visible: boolean;
}

export function ShareLinkToast({ visible }: ShareLinkToastProps) {
  const { t } = useTranslation();
  if (!visible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-slide-up">
      <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[280px]">
        <Check className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">{t("common.linkCopied")}</span>
      </div>
    </div>
  );
}
