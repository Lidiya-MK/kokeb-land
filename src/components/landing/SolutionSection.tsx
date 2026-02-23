import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Brain, FlaskConical, Gamepad2, Bot, Heart, Globe, Star } from 'lucide-react';

const features = [
  { key: 'adaptive', icon: Brain, color: 'bg-secondary/10 text-secondary' },
  { key: 'labs', icon: FlaskConical, color: 'bg-success/10 text-success' },
  { key: 'games', icon: Gamepad2, color: 'bg-accent/10 text-accent' },
  { key: 'tutor', icon: Bot, color: 'bg-primary/10 text-primary' },
  { key: 'skills', icon: Heart, color: 'bg-destructive/10 text-destructive' },
  { key: 'bilingual', icon: Globe, color: 'bg-warning/10 text-warning' },
];

export function SolutionSection() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Star className="h-4 w-4 fill-primary" />
            {t('solution.badge')}
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('solution.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('solution.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">
                {t(`solution.${feature.key}.title`)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(`solution.${feature.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
