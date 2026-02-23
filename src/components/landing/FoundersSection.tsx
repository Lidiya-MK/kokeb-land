import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Code2, Cpu, BarChart3, Award, Heart } from 'lucide-react';
import emnetPhoto from '@/assets/emnet-photo.png';
import lidiyaPhoto from '@/assets/lidiya-photo.png';

export function FoundersSection() {
  const { t } = useLanguage();

  return (
    <section id="founders" className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t('founders.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('founders.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Lidiya */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 lg:p-8 rounded-2xl bg-card border border-border"
            >
              <img
                src={lidiyaPhoto}
                alt="Lidiya Mamo"
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary/20"
              />
              <h3 className="font-display text-xl font-bold mb-1">{t('founders.lidiya.name')}</h3>
              <p className="text-sm text-primary font-semibold mb-3">{t('founders.lidiya.role')}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary">
                  <Code2 className="h-3 w-3" /> {t('founders.lidiya.tag1')}
                </span>
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-success/10 text-success">
                  <Award className="h-3 w-3" /> {t('founders.lidiya.tag2')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('founders.lidiya.story')}
              </p>
            </motion.div>

            {/* Emnet */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 lg:p-8 rounded-2xl bg-card border border-border"
            >
              <img
                src={emnetPhoto}
                alt="Emnet Mamo"
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-secondary/20"
              />
              <h3 className="font-display text-xl font-bold mb-1">{t('founders.emnet.name')}</h3>
              <p className="text-sm text-primary font-semibold mb-3">{t('founders.emnet.role')}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary">
                  <Cpu className="h-3 w-3" /> {t('founders.emnet.tag1')}
                </span>
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-success/10 text-success">
                  <BarChart3 className="h-3 w-3" /> {t('founders.emnet.tag2')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('founders.emnet.story')}
              </p>
            </motion.div>
          </div>

          {/* Shared mission quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center p-8 rounded-2xl bg-secondary/5 border border-secondary/10"
          >
            <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
            <blockquote className="text-lg md:text-xl font-medium text-foreground italic mb-4">
              {t('founders.mission')}
            </blockquote>
            <p className="text-sm text-muted-foreground">
              {t('founders.experience')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
