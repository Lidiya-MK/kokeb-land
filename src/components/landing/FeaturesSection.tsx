import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Brain, 
  FlaskConical, 
  Gamepad2, 
  Bot, 
  Trophy, 
  BookOpen 
} from 'lucide-react';

const features = [
  {
    key: 'adaptive',
    icon: Brain,
    color: 'bg-secondary/10 text-secondary',
  },
  {
    key: 'labs',
    icon: FlaskConical,
    color: 'bg-success/10 text-success',
  },
  {
    key: 'games',
    icon: Gamepad2,
    color: 'bg-accent/10 text-accent',
  },
  {
    key: 'tutor',
    icon: Bot,
    color: 'bg-primary/10 text-primary',
  },
  {
    key: 'ranking',
    icon: Trophy,
    color: 'bg-warning/10 text-warning',
  },
  {
    key: 'curriculum',
    icon: BookOpen,
    color: 'bg-destructive/10 text-destructive',
  },
];

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
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
                {t(`feature.${feature.key}.title`)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(`feature.${feature.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
