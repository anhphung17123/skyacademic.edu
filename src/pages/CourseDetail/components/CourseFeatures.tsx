import { useTranslation } from "react-i18next";
import { Globe, Zap, Award, BookOpen } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import type { LucideIcon } from "lucide-react";

const FEATURES = [
  {
    id: "bilingual",
    icon: Globe as LucideIcon,
    titleKey: "courseDetail.featureBilingual" as const,
    descKey: "courseDetail.featureBilingualDesc" as const,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "flexible",
    icon: Zap as LucideIcon,
    titleKey: "courseDetail.featureFlexible" as const,
    descKey: "courseDetail.featureFlexibleDesc" as const,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "expert",
    icon: Award as LucideIcon,
    titleKey: "courseDetail.featureExpert" as const,
    descKey: "courseDetail.featureExpertDesc" as const,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "materials",
    icon: BookOpen as LucideIcon,
    titleKey: "courseDetail.featureMaterials" as const,
    descKey: "courseDetail.featureMaterialsDesc" as const,
    gradient: "from-green-500 to-emerald-500",
  },
];

export function CourseFeatures() {
  const { t } = useTranslation();

  return (
    <Section
      padding="none"
      background="transparent"
      className="relative -mt-8 z-10 hidden sm:block"
    >
      <div className="bg-white dark:bg-gray-900 pt-8 sm:pt-12 pb-0">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  <div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-500`}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </Section>
  );
}
