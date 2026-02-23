import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  Atom,
  Microscope,
  Zap,
  Magnet,
  Lightbulb,
  Beaker,
  Waves,
  Heart,
  Leaf,
  Lock,
  Play,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const labs = [
  {
    category: { en: 'Physics', am: 'ፊዚክስ' },
    icon: Atom,
    color: 'from-purple-500 to-purple-600',
    experiments: [
      { id: 'motion', name: { en: "Newton's Laws of Motion", am: 'የኒውተን የእንቅስቃሴ ህጎች' }, icon: Zap, unlocked: true, xp: 50 },
      { id: 'electricity', name: { en: 'Electric Circuits', am: 'የኤሌክትሪክ ዑደቶች' }, icon: Zap, unlocked: true, xp: 60 },
      { id: 'magnetism', name: { en: 'Magnetism', am: 'ማግኔቲዝም' }, icon: Magnet, unlocked: true, xp: 45 },
      { id: 'optics', name: { en: 'Light & Optics', am: 'ብርሃን እና ኦፕቲክስ' }, icon: Lightbulb, unlocked: false, xp: 55 },
      { id: 'waves', name: { en: 'Waves & Sound', am: 'ሞገዶች እና ድምጽ' }, icon: Waves, unlocked: false, xp: 50 },
    ],
  },
  {
    category: { en: 'Chemistry', am: 'ኬሚስትሪ' },
    icon: FlaskConical,
    color: 'from-green-500 to-green-600',
    experiments: [
      { id: 'reactions', name: { en: 'Chemical Reactions', am: 'ኬሚካላዊ ምላሾች' }, icon: FlaskConical, unlocked: true, xp: 55 },
      { id: 'periodic', name: { en: 'Periodic Table Explorer', am: 'የፔሪዮዲክ ሠንጠረዥ አሳሽ' }, icon: Beaker, unlocked: true, xp: 40 },
      { id: 'acids', name: { en: 'Acids & Bases', am: 'አሲዶች እና ቤዝዎች' }, icon: Beaker, unlocked: false, xp: 50 },
      { id: 'bonds', name: { en: 'Chemical Bonds', am: 'ኬሚካላዊ ትስስሮች' }, icon: Beaker, unlocked: false, xp: 60 },
    ],
  },
  {
    category: { en: 'Biology', am: 'ባዮሎጂ' },
    icon: Microscope,
    color: 'from-pink-500 to-pink-600',
    experiments: [
      { id: 'cell', name: { en: 'Cell Structure', am: 'የሕዋስ መዋቅር' }, icon: Microscope, unlocked: true, xp: 45 },
      { id: 'anatomy', name: { en: 'Human Anatomy', am: 'የሰው አካል አናቶሚ' }, icon: Heart, unlocked: true, xp: 65 },
      { id: 'ecosystem', name: { en: 'Ecosystem Simulation', am: 'የስነ-ምህዳር ማስመሰል' }, icon: Leaf, unlocked: false, xp: 55 },
      { id: 'genetics', name: { en: 'Genetics Lab', am: 'የጀነቲክስ ቤተሙከራ' }, icon: Microscope, unlocked: false, xp: 70 },
    ],
  },
];

const VirtualLabs = () => {
  const { language } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold mb-2">
              {language === 'en' ? 'Virtual Science Labs' : 'ምናባዊ የሳይንስ ቤተሙከራዎች'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Conduct safe, interactive experiments from anywhere' 
                : 'ከማንኛውም ቦታ ደህንነቱ የተጠበቀ በይነተገናኝ ሙከራዎችን ያካሂዱ'}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-card rounded-xl border border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-success" />
              <span className="font-bold">5</span>
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Completed' : 'ተጠናቅቋል'}
              </span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <span className="font-bold">275</span>
              <span className="text-sm text-muted-foreground">XP</span>
            </div>
          </div>
        </div>

        {/* Labs by Category */}
        {labs.map((category, catIndex) => (
          <motion.div
            key={category.category.en}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="space-y-4"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <category.icon className="h-5 w-5 text-white" />
              </div>
              <h2 className="font-display text-xl font-bold">
                {category.category[language]}
              </h2>
            </div>

            {/* Experiments Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.experiments.map((exp, expIndex) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: catIndex * 0.1 + expIndex * 0.05 }}
                  className={cn(
                    'relative bg-card rounded-xl border border-border p-5 transition-all duration-300',
                    exp.unlocked 
                      ? 'hover:border-primary/30 hover:shadow-lg cursor-pointer' 
                      : 'opacity-60'
                  )}
                >
                  {/* Lock Overlay */}
                  {!exp.unlocked && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? 'Complete previous lessons' : 'ቀዳሚ ትምህርቶችን አጠናቅቅ'}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                      <exp.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold">{exp.xp}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold mb-3">{exp.name[language]}</h3>

                  {exp.unlocked && (
                    <Button size="sm" className="w-full" asChild>
                      <Link to={`/dashboard/labs/${exp.id}`}>
                        <Play className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Start Lab' : 'ቤተሙከራ ጀምር'}
                      </Link>
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-muted/50 rounded-xl p-6 text-center"
        >
          <FlaskConical className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-display text-lg font-bold mb-2">
            {language === 'en' ? 'More Labs Coming Soon!' : 'ተጨማሪ ቤተሙከራዎች በቅርቡ!'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'We\'re constantly adding new experiments. Check back soon!' 
              : 'በየጊዜው አዳዲስ ሙከራዎችን እንጨምራለን። በቅርቡ ተመለሱ!'}
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default VirtualLabs;
