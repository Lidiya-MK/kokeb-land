import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Check, Sparkles, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    key: 'basic',
    features: [
      'Core AI-powered learning',
      'All academic subjects (K-12)',
      'Progress tracking',
      'Parent performance insights',
      'Bilingual support',
    ],
    featuresAm: [
      'ዋና AI ትምህርት',
      'ሁሉም ትምህርቶች (K-12)',
      'የእድገት ክትትል',
      'የወላጅ ግንዛቤ',
      'ባለሁለት ቋንቋ ድጋፍ',
    ],
  },
  {
    key: 'pro',
    popular: true,
    features: [
      'Everything in Basic',
      'Virtual science labs',
      'AI Tutor 24/7',
      'Gamified learning & challenges',
      'Life skills modules',
      'Unlimited interactive content',
      'Advanced analytics',
    ],
    featuresAm: [
      'በመሰረታዊ ውስጥ ያለው ሁሉ',
      'ምናባዊ የሳይንስ ቤተሙከራ',
      'AI አስተማሪ 24/7',
      'ጨዋታ ትምህርት',
      'የህይወት ክህሎት',
      'ያልተገደበ ይዘት',
      'የላቀ ትንታኔ',
    ],
  },
  {
    key: 'school',
    features: [
      'Everything in Premium',
      'Bulk student accounts',
      'Teacher & admin dashboards',
      'Class-level analytics',
      'Custom curriculum options',
      'Dedicated support',
    ],
    featuresAm: [
      'በፕሪሚየም ውስጥ ያለው ሁሉ',
      'የብዙ ተማሪ አካውንቶች',
      'የመምህር ዳሽቦርድ',
      'የክፍል ትንታኔ',
      'ብጁ ስርዓተ ትምህርት',
      'የተወሰነ ድጋፍ',
    ],
  },
];

export function PricingSection() {
  const { t, language } = useLanguage();

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            {t('pricing.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 text-warning text-sm font-semibold">
            <Clock className="h-4 w-4" />
            {t('pricing.comingSoon')}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const features = language === 'am' ? plan.featuresAm : plan.features;
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'relative p-6 lg:p-8 rounded-2xl border transition-all duration-300',
                  plan.popular
                    ? 'bg-secondary text-secondary-foreground border-secondary scale-105 shadow-xl'
                    : 'bg-card border-border hover:border-primary/30 hover:shadow-lg'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1 px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      <Sparkles className="h-4 w-4" />
                      {t('plan.pro.popular')}
                    </div>
                  </div>
                )}

                <h3 className="font-display text-xl font-bold mb-2">
                  {t(`plan.${plan.key}.name`)}
                </h3>
                <p className={cn('text-sm mb-6', plan.popular ? 'text-secondary-foreground/80' : 'text-muted-foreground')}>
                  {t(`plan.${plan.key}.desc`)}
                </p>

                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={cn('h-5 w-5 flex-shrink-0 mt-0.5', plan.popular ? 'text-primary' : 'text-success')} />
                      <span className={cn('text-sm', plan.popular ? 'text-secondary-foreground/90' : 'text-foreground')}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
