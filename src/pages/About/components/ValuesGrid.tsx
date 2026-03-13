import type { LucideIcon } from 'lucide-react';

interface ValueItem {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
}

interface ValuesGridProps {
  readonly values: readonly ValueItem[];
}

export const ValuesGrid = ({ values }: ValuesGridProps) => (
  <div className="grid md:grid-cols-2 gap-8 mb-16">
    {values.map((value) => (
      <div
        key={value.title}
        className="p-8 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all hover:border-primary-300 dark:hover:border-primary-600"
      >
        <div className="flex items-start gap-5">
          <div className="p-3.5 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex-shrink-0 border border-primary-200/60 dark:border-primary-700/40">
            <value.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2.5">
              {value.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {value.description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
);
