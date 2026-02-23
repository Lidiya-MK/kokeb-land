import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Users,
  Lightbulb,
  Palette,
  Brain,
  Wallet,
  Lock,
  Play,
  Star,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const skills = [
  {
    id: 'communication',
    name: { en: 'Communication', am: 'ግንኙነት' },
    desc: { en: 'Public speaking, debate, and presentation skills', am: 'በአደባባይ መናገር፣ ክርክር እና የዝግጅት ክህሎቶች' },
    icon: MessageCircle,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    progress: 45,
    modules: 8,
    completedModules: 3,
    unlocked: true,
  },
  {
    id: 'leadership',
    name: { en: 'Leadership', am: 'አመራር' },
    desc: { en: 'Team management and decision-making', am: 'የቡድን አስተዳደር እና ውሳኔ መስጠት' },
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    progress: 30,
    modules: 6,
    completedModules: 2,
    unlocked: true,
  },
  {
    id: 'creativity',
    name: { en: 'Creativity', am: 'ፈጠራ' },
    desc: { en: 'Brainstorming and creative problem-solving', am: 'ሃሳብ ማመንጨት እና ፈጠራዊ ችግር መፍታት' },
    icon: Palette,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-500/10',
    progress: 60,
    modules: 7,
    completedModules: 4,
    unlocked: true,
  },
  {
    id: 'critical-thinking',
    name: { en: 'Critical Thinking', am: 'ወሳኝ አስተሳሰብ' },
    desc: { en: 'Logic puzzles and analysis challenges', am: 'የአመክንዮ እንቆቅልሾች እና የትንተና ተግዳሮቶች' },
    icon: Brain,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    progress: 25,
    modules: 10,
    completedModules: 2,
    unlocked: true,
  },
  {
    id: 'innovation',
    name: { en: 'Innovation', am: 'ፈጠራ' },
    desc: { en: 'Design thinking and entrepreneurship basics', am: 'የንድፍ አስተሳሰብ እና የስራ ፈጠራ መሰረታዊ ነገሮች' },
    icon: Lightbulb,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-500/10',
    progress: 0,
    modules: 8,
    completedModules: 0,
    unlocked: false,
  },
  {
    id: 'financial-literacy',
    name: { en: 'Financial Literacy', am: 'የገንዘብ ግንዛቤ' },
    desc: { en: 'Money management and saving basics', am: 'የገንዘብ አስተዳደር እና የቁጠባ መሰረታዊ ነገሮች' },
    icon: Wallet,
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-500/10',
    progress: 0,
    modules: 6,
    completedModules: 0,
    unlocked: false,
  },
];

const featuredLesson = {
  skill: { en: 'Communication', am: 'ግንኙነት' },
  title: { en: 'Presenting with Confidence', am: 'በልበ ሙሉነት ማቅረብ' },
  duration: '15 min',
  xp: 40,
};

const LifeSkills = () => {
  const { language } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold mb-2">
            {language === 'en' ? 'Life Skills Academy' : 'የህይወት ክህሎት አካዳሚ'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Develop essential skills for success beyond academics' 
              : 'ከትምህርት ባሻገር ለስኬት አስፈላጊ ክህሎቶችን ያዳብሩ'}
          </p>
        </div>

        {/* Featured Lesson */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-secondary to-secondary/80 rounded-xl p-6 text-secondary-foreground"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-sm text-secondary-foreground/70 mb-1 block">
                {language === 'en' ? 'Continue Learning' : 'መማር ቀጥል'}
              </span>
              <h2 className="font-display text-xl font-bold mb-2">
                {featuredLesson.title[language]}
              </h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-secondary-foreground/70">{featuredLesson.skill[language]}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredLesson.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-primary" />
                  {featuredLesson.xp} XP
                </span>
              </div>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Play className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Continue' : 'ቀጥል'}
            </Button>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300',
                skill.unlocked 
                  ? 'hover:border-primary/30 hover:shadow-lg' 
                  : 'opacity-60'
              )}
            >
              {/* Lock Overlay */}
              {!skill.unlocked && (
                <div className="absolute inset-0 bg-background/70 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Complete 5 modules to unlock' : '5 ሞጁሎችን አጠናቅቅ ለመክፈት'}
                    </p>
                  </div>
                </div>
              )}

              {/* Skill Header */}
              <div className={`bg-gradient-to-r ${skill.color} p-4`}>
                <skill.icon className="h-8 w-8 text-white" />
              </div>

              {/* Skill Info */}
              <div className="p-4">
                <h3 className="font-display font-bold text-lg mb-1">
                  {skill.name[language]}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {skill.desc[language]}
                </p>

                {skill.unlocked && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        {skill.completedModules}/{skill.modules} {language === 'en' ? 'modules' : 'ሞጁሎች'}
                      </span>
                      <span className="font-bold">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2 mb-4" />

                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/dashboard/skills/${skill.id}`}>
                        {skill.progress > 0 
                          ? (language === 'en' ? 'Continue' : 'ቀጥል')
                          : (language === 'en' ? 'Start Learning' : 'መማር ጀምር')}
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Life Skills Matter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-muted/50 rounded-xl p-6"
        >
          <h2 className="font-display text-xl font-bold mb-4 text-center">
            {language === 'en' ? 'Why Life Skills Matter' : 'ለምን የህይወት ክህሎቶች ያስፈልጋሉ'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">
                {language === 'en' ? 'Express Yourself' : 'እራስህን ግለጽ'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en' 
                  ? 'Communicate ideas clearly and confidently' 
                  : 'ሃሳቦችን በግልጽ እና በልበ ሙሉነት አውጣ'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">
                {language === 'en' ? 'Lead Others' : 'ሌሎችን መራ'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en' 
                  ? 'Inspire and guide teams to success' 
                  : 'ቡድኖችን ወደ ስኬት አነሳስ እና መራ'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <Brain className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">
                {language === 'en' ? 'Solve Problems' : 'ችግሮችን ፍታ'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en' 
                  ? 'Think critically and find creative solutions' 
                  : 'በጥልቀት አስብ እና ፈጠራዊ መፍትሄዎችን ፈልግ'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default LifeSkills;
