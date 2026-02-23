import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { AlertTriangle, Users, School, TrendingDown } from 'lucide-react';

export function ProblemSection() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: TrendingDown,
      value: '8.4%',
      label: t('problem.stat1'),
      color: 'bg-destructive/10 text-destructive',
    },
    {
      icon: School,
      value: '1,200+',
      label: t('problem.stat2'),
      color: 'bg-warning/10 text-warning',
    },
    {
      icon: Users,
      value: t('problem.stat3Value'),
      label: t('problem.stat3'),
      color: 'bg-secondary/10 text-secondary',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-6">
            <AlertTriangle className="h-4 w-4" />
            {t('problem.badge')}
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('problem.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('problem.subtitle')}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-6 lg:p-8 rounded-2xl bg-card border border-border text-center"
            >
              <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <p className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-center"
        >
          <blockquote className="text-lg md:text-xl font-medium text-foreground italic border-l-4 border-primary pl-6 text-left">
            "{t('problem.quote')}"
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
