import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  Microscope, 
  Globe2, 
  BookOpen, 
  Languages,
  Beaker
} from 'lucide-react';

const subjects = [
  { key: 'math', icon: Calculator, grades: 'K-12', color: 'from-blue-500 to-blue-600' },
  { key: 'physics', icon: Atom, grades: '7-12', color: 'from-purple-500 to-purple-600' },
  { key: 'chemistry', icon: FlaskConical, grades: '7-12', color: 'from-green-500 to-green-600' },
  { key: 'biology', icon: Microscope, grades: '7-12', color: 'from-pink-500 to-pink-600' },
  { key: 'geography', icon: Globe2, grades: 'K-12', color: 'from-cyan-500 to-cyan-600' },
  { key: 'history', icon: BookOpen, grades: 'K-12', color: 'from-amber-500 to-amber-600' },
  { key: 'amharic', icon: Languages, grades: 'K-12', color: 'from-rose-500 to-rose-600' },
  { key: 'science', icon: Beaker, grades: 'K-6', color: 'from-teal-500 to-teal-600' },
];

export function SubjectsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('subjects.title')}
          </h2>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-muted group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors">
                    <subject.icon className="h-6 w-6 text-foreground group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-1 group-hover:text-white transition-colors">
                    {t(`subjects.${subject.key}`)}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors">
                    {t('common.grades')} {subject.grades}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
