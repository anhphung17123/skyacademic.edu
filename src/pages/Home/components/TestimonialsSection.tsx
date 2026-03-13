import { useTranslation } from 'react-i18next';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    nameKey: 'testimonial1Name',
    roleKey: 'testimonial1Role',
    textKey: 'testimonial1Text',
    rating: 5,
  },
  {
    id: 2,
    nameKey: 'testimonial2Name',
    roleKey: 'testimonial2Role',
    textKey: 'testimonial2Text',
    rating: 5,
  },
  {
    id: 3,
    nameKey: 'testimonial3Name',
    roleKey: 'testimonial3Role',
    textKey: 'testimonial3Text',
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-primary-400 dark:text-primary-500 mb-4 opacity-50" />
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
                {t(`testimonials.${item.textKey}`)}
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {t(`testimonials.${item.nameKey}`)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t(`testimonials.${item.roleKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
