import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Globe2 } from 'lucide-react';

export function MarketSection() {
  const { t } = useLanguage();

  const metrics = [
    { icon: TrendingUp, value: '$5.8B+', label: t('market.metric1'), sub: t('market.metric1Sub') },
    { icon: Target, value: '30M+', label: t('market.metric2'), sub: t('market.metric2Sub') },
    { icon: Globe2, value: 'SDG 4 & 10', label: t('market.metric3'), sub: t('market.metric3Sub') },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('market.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('market.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-6 lg:p-8 rounded-2xl bg-card border border-border text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <metric.icon className="h-7 w-7 text-primary" />
              </div>
              <p className="font-display text-3xl lg:text-4xl font-bold text-gradient-primary mb-2">{metric.value}</p>
              <p className="font-semibold text-foreground mb-1">{metric.label}</p>
              <p className="text-sm text-muted-foreground">{metric.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
