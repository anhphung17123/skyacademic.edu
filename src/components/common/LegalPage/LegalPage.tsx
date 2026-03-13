import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { PageTransition } from "@/components/common/PageTransition";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/common/PageHero";
import { LegalSectionCard } from "./LegalSectionCard";
import { getLegalPageColorClasses, getLegalSectionShortTitle } from "@/utils/legal-page";
import type { LegalPageColor } from "@/utils/legal-page";

export interface LegalSectionConfig {
  icon: LucideIcon;
  title: string;
  color: LegalPageColor;
  description: string;
  details: string[];
  highlight?: boolean;
}

export interface LegalPageProps {
  title: string;
  subtitle?: string;
  badge: string;
  badgeIcon: LucideIcon;
  intro: string;
  /** Optional block above sections (e.g. agreement notice) */
  agreementBlock?: ReactNode;
  sections: LegalSectionConfig[];
  /** Optional highlight text for sections that have highlight: true (e.g. money-back guarantee) */
  sectionHighlightText?: string;
  footer: ReactNode;
  /** Optional quick nav: render links to #section-1, #section-2, etc. */
  showQuickNav?: boolean;
  quickNavTitle?: string;
}

export const LegalPage = ({
  title,
  subtitle,
  badge,
  badgeIcon,
  intro,
  agreementBlock,
  sections,
  sectionHighlightText,
  footer,
  showQuickNav = false,
  quickNavTitle = "Quick Navigation",
}: LegalPageProps) => (
  <PageTransition>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <PageHero
        title={title}
        subtitle={subtitle}
        badge={badge}
        badgeIcon={badgeIcon}
        gradient="page"
      />

      <Section padding="xl" background="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {intro}
              </p>
            </div>

            {agreementBlock}

            {showQuickNav && (
              <div className="card p-6 md:p-8 mb-12 transition-all hover:shadow-xl">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {quickNavTitle}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sections.map((section, index) => {
                    const colors = getLegalPageColorClasses(section.color);
                    const shortTitle = getLegalSectionShortTitle(section.title);
                    return (
                      <a
                        key={index}
                        href={`#section-${index + 1}`}
                        className={`flex items-center gap-3 p-3 rounded-xl ${colors.bg} hover:scale-105 transition-transform group`}
                      >
                        <section.icon className={`w-5 h-5 ${colors.text}`} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
                          {shortTitle}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-8">
              {sections.map((section, index) => (
                <LegalSectionCard
                  key={index}
                  id={`section-${index + 1}`}
                  icon={section.icon}
                  title={section.title}
                  description={section.description}
                  details={section.details}
                  colorClasses={getLegalPageColorClasses(section.color)}
                  highlight={section.highlight}
                  highlightContent={section.highlight ? sectionHighlightText : undefined}
                />
              ))}
            </div>

            <div className="mt-12">{footer}</div>
          </div>
        </Container>
      </Section>
    </div>
  </PageTransition>
);