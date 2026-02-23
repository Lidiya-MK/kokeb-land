import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import {
  Calculator,
  Atom,
  FlaskConical,
  Microscope,
  Globe2,
  BookOpen,
  Languages,
  Beaker,
  ChevronRight,
  Star,
  Clock,
  CheckCircle2,
} from 'lucide-react';

const subjects = [
  { 
    id: 'math',
    icon: Calculator, 
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
    progress: 68,
    lessonsTotal: 24,
    lessonsCompleted: 16,
    quizzesPassed: 8,
    estimatedTime: '2h 30m',
  },
  { 
    id: 'physics',
    icon: Atom, 
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-500',
    progress: 45,
    lessonsTotal: 20,
    lessonsCompleted: 9,
    quizzesPassed: 4,
    estimatedTime: '4h 15m',
  },
  { 
    id: 'chemistry',
    icon: FlaskConical, 
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
    progress: 32,
    lessonsTotal: 18,
    lessonsCompleted: 6,
    quizzesPassed: 2,
    estimatedTime: '5h 45m',
  },
  { 
    id: 'biology',
    icon: Microscope, 
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-500/10',
    textColor: 'text-pink-500',
    progress: 55,
    lessonsTotal: 22,
    lessonsCompleted: 12,
    quizzesPassed: 6,
    estimatedTime: '3h 30m',
  },
  { 
    id: 'geography',
    icon: Globe2, 
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-500/10',
    textColor: 'text-cyan-500',
    progress: 78,
    lessonsTotal: 16,
    lessonsCompleted: 12,
    quizzesPassed: 10,
    estimatedTime: '1h 45m',
  },
  { 
    id: 'history',
    icon: BookOpen, 
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-500',
    progress: 40,
    lessonsTotal: 20,
    lessonsCompleted: 8,
    quizzesPassed: 3,
    estimatedTime: '4h 30m',
  },
  { 
    id: 'amharic',
    icon: Languages, 
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-500/10',
    textColor: 'text-rose-500',
    progress: 62,
    lessonsTotal: 18,
    lessonsCompleted: 11,
    quizzesPassed: 7,
    estimatedTime: '2h 50m',
  },
];

const subjectNames: Record<string, Record<string, string>> = {
  math: { en: 'Mathematics', am: 'ሂሳብ' },
  physics: { en: 'Physics', am: 'ፊዚክስ' },
  chemistry: { en: 'Chemistry', am: 'ኬሚስትሪ' },
  biology: { en: 'Biology', am: 'ባዮሎጂ' },
  geography: { en: 'Geography', am: 'ጂኦግራፊ' },
  history: { en: 'History', am: 'ታሪክ' },
  amharic: { en: 'Amharic', am: 'አማርኛ' },
};

const Subjects = () => {
  const { language } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold mb-2">
            {language === 'en' ? 'Your Subjects' : 'ትምህርቶችህ'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Continue where you left off or explore new topics' 
              : 'ከቀረህበት ቀጥል ወይም አዳዲስ ርዕሶችን አስስ'}
          </p>
        </div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold mb-1">
                {language === 'en' ? 'Overall Progress' : 'አጠቃላይ እድገት'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {language === 'en' 
                  ? 'You\'re making great progress across all subjects!' 
                  : 'በሁሉም ትምህርቶች ላይ ጥሩ እድገት እያደረግክ ነው!'}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">54%</p>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Complete' : 'ተጠናቅቋል'}
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-success">74</p>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Lessons Done' : 'የተጠናቀቁ ትምህርቶች'}
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-accent">40</p>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Quizzes Passed' : 'የተሳኩ ፈተናዎች'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/dashboard/subjects/${subject.id}`}
                className="block bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center`}>
                    <subject.icon className="h-7 w-7 text-white" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                {/* Title & Progress */}
                <h3 className="font-display text-lg font-bold mb-2">
                  {subjectNames[subject.id][language]}
                </h3>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Progress' : 'እድገት'}
                  </span>
                  <span className="font-bold">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2 mb-4" />

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className={`${subject.bgColor} rounded-lg py-2`}>
                    <p className={`font-bold ${subject.textColor}`}>
                      {subject.lessonsCompleted}/{subject.lessonsTotal}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Lessons' : 'ትምህርቶች'}
                    </p>
                  </div>
                  <div className={`${subject.bgColor} rounded-lg py-2`}>
                    <p className={`font-bold ${subject.textColor}`}>
                      {subject.quizzesPassed}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Quizzes' : 'ፈተናዎች'}
                    </p>
                  </div>
                  <div className={`${subject.bgColor} rounded-lg py-2`}>
                    <div className="flex items-center justify-center gap-1">
                      <Clock className={`h-3 w-3 ${subject.textColor}`} />
                      <p className={`font-bold text-sm ${subject.textColor}`}>
                        {subject.estimatedTime.split(' ')[0]}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Left' : 'ቀሪ'}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subjects;
