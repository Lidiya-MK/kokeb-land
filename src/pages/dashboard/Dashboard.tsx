import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Star,
  Flame,
  Trophy,
  Target,
  TrendingUp,
  BookOpen,
  FlaskConical,
  Gamepad2,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

const Dashboard = () => {
  const { language } = useLanguage();

  // Mock data
  const stats = {
    xp: 2450,
    streak: 7,
    rank: 12,
    lessonsCompleted: 45,
    quizzesPassed: 23,
    dailyGoalProgress: 75,
  };

  const recentSubjects = [
    { name: language === 'en' ? 'Mathematics' : 'ሂሳብ', progress: 68, color: 'bg-blue-500', lessons: 12 },
    { name: language === 'en' ? 'Physics' : 'ፊዚክስ', progress: 45, color: 'bg-purple-500', lessons: 8 },
    { name: language === 'en' ? 'Chemistry' : 'ኬሚስትሪ', progress: 32, color: 'bg-green-500', lessons: 5 },
  ];

  const dailyChallenges = [
    { title: language === 'en' ? 'Complete 3 lessons' : '3 ትምህርቶች አጠናቅቅ', xp: 50, completed: true },
    { title: language === 'en' ? 'Pass a quiz' : 'ፈተና አልፍ', xp: 30, completed: true },
    { title: language === 'en' ? 'Play a math game' : 'የሂሳብ ጨዋታ ተጫወት', xp: 20, completed: false },
  ];

  const upcomingLessons = [
    { subject: language === 'en' ? 'Physics' : 'ፊዚክስ', topic: language === 'en' ? 'Newton\'s Laws' : 'የኒውተን ህጎች', time: '10:00 AM' },
    { subject: language === 'en' ? 'Chemistry' : 'ኬሚስትሪ', topic: language === 'en' ? 'Chemical Bonds' : 'ኬሚካላዊ ትስስር', time: '2:00 PM' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground p-6 lg:p-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                {language === 'en' ? 'Daily Streak Active!' : 'ዕለታዊ ተከታታይ ንቁ!'}
              </span>
            </div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold mb-2">
              {language === 'en' ? 'Welcome back, Abebe!' : 'እንኳን ደህና መጣህ፣ አበበ!'}
            </h1>
            <p className="text-secondary-foreground/80 mb-4">
              {language === 'en' 
                ? "You're doing great! Keep up the momentum." 
                : 'ጥሩ እያደረግክ ነው! ፍጥነትህን ቀጥል።'}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-secondary-foreground/10 rounded-lg px-4 py-2">
                <Flame className="h-5 w-5 text-accent" />
                <span className="font-bold">{stats.streak}</span>
                <span className="text-sm text-secondary-foreground/70">
                  {language === 'en' ? 'day streak' : 'ቀን ተከታታይ'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-secondary-foreground/10 rounded-lg px-4 py-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="font-bold">#{stats.rank}</span>
                <span className="text-sm text-secondary-foreground/70">
                  {language === 'en' ? 'in your grade' : 'በክፍልህ'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Total XP' : 'ጠቅላላ XP'}
              </span>
            </div>
            <p className="font-display text-2xl font-bold">{stats.xp.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Lessons' : 'ትምህርቶች'}
              </span>
            </div>
            <p className="font-display text-2xl font-bold">{stats.lessonsCompleted}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Quizzes' : 'ፈተናዎች'}
              </span>
            </div>
            <p className="font-display text-2xl font-bold">{stats.quizzesPassed}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Daily Goal' : 'ዕለታዊ ግብ'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={stats.dailyGoalProgress} className="flex-1 h-2" />
              <span className="text-sm font-medium">{stats.dailyGoalProgress}%</span>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-card rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold">
                {language === 'en' ? 'Continue Learning' : 'መማር ቀጥል'}
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/subjects">
                  {language === 'en' ? 'View All' : 'ሁሉንም ተመልከት'}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {recentSubjects.map((subject, index) => (
                <motion.div
                  key={subject.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl ${subject.color} flex items-center justify-center`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{subject.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {subject.lessons} {language === 'en' ? 'lessons' : 'ትምህርቶች'}
                      </span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <span className="font-bold text-lg">{subject.progress}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Daily Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Target className="h-5 w-5 text-accent" />
              <h2 className="font-display text-xl font-bold">
                {language === 'en' ? 'Daily Challenges' : 'ዕለታዊ ተግዳሮቶች'}
              </h2>
            </div>

            <div className="space-y-3">
              {dailyChallenges.map((challenge, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    challenge.completed ? 'bg-success/10' : 'bg-muted/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    challenge.completed ? 'bg-success text-success-foreground' : 'bg-muted'
                  }`}>
                    {challenge.completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${challenge.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {challenge.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-bold">{challenge.xp}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Completion' : 'ማጠናቀቅ'}
                </span>
                <span className="text-sm font-bold">2/3</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white cursor-pointer"
          >
            <Link to="/dashboard/subjects" className="block">
              <BookOpen className="h-8 w-8 mb-3" />
              <h3 className="font-display font-bold text-lg mb-1">
                {language === 'en' ? 'Learn' : 'ተማር'}
              </h3>
              <p className="text-sm text-white/80">
                {language === 'en' ? 'Browse subjects' : 'ትምህርቶችን ቃኝ'}
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white cursor-pointer"
          >
            <Link to="/dashboard/labs" className="block">
              <FlaskConical className="h-8 w-8 mb-3" />
              <h3 className="font-display font-bold text-lg mb-1">
                {language === 'en' ? 'Labs' : 'ቤተሙከራ'}
              </h3>
              <p className="text-sm text-white/80">
                {language === 'en' ? 'Virtual experiments' : 'ምናባዊ ሙከራዎች'}
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white cursor-pointer"
          >
            <Link to="/dashboard/games" className="block">
              <Gamepad2 className="h-8 w-8 mb-3" />
              <h3 className="font-display font-bold text-lg mb-1">
                {language === 'en' ? 'Games' : 'ጨዋታዎች'}
              </h3>
              <p className="text-sm text-white/80">
                {language === 'en' ? 'Learn & play' : 'ተማር እና ተጫወት'}
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white cursor-pointer"
          >
            <Link to="/dashboard/leaderboard" className="block">
              <Trophy className="h-8 w-8 mb-3" />
              <h3 className="font-display font-bold text-lg mb-1">
                {language === 'en' ? 'Rankings' : 'ደረጃዎች'}
              </h3>
              <p className="text-sm text-white/80">
                {language === 'en' ? 'See your rank' : 'ደረጃህን ተመልከት'}
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
