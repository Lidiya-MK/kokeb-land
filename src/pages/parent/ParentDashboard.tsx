import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  Clock,
  TrendingUp,
  Award,
  Calendar,
  ChevronDown,
  BookOpen,
  Target,
  Flame,
  Star,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  User,
  CreditCard,
} from 'lucide-react';
import kokebLogo from '@/assets/kokeb-logo.png';
import { cn } from '@/lib/utils';

// Dummy child data
const childData = {
  name: 'Abebe Kebede',
  avatar: '👦',
  grade: '5',
  xp: 2450,
  streak: 12,
  totalLessons: 45,
  completedLessons: 28,
  weeklyGoal: 5,
  weeklyCompleted: 3,
  subjects: [
    { name: { en: 'Mathematics', am: 'ሒሳብ' }, progress: 72, color: 'from-blue-500 to-blue-600', recentScore: 85 },
    { name: { en: 'Science', am: 'ሳይንስ' }, progress: 58, color: 'from-green-500 to-green-600', recentScore: 78 },
    { name: { en: 'Amharic', am: 'አማርኛ' }, progress: 84, color: 'from-purple-500 to-purple-600', recentScore: 92 },
    { name: { en: 'History', am: 'ታሪክ' }, progress: 45, color: 'from-orange-500 to-orange-600', recentScore: 70 },
  ],
  recentActivity: [
    { type: 'lesson', name: { en: 'Fractions Introduction', am: 'ክፍልፋዮች መግቢያ' }, subject: 'Math', time: '2 hours ago', xp: 50 },
    { type: 'quiz', name: { en: 'Cell Structure Quiz', am: 'የሕዋስ መዋቅር ጥያቄ' }, subject: 'Science', time: '5 hours ago', xp: 30, score: 80 },
    { type: 'game', name: { en: 'Math Shortcuts', am: 'የሒሳብ አቋራጮች' }, subject: 'Math', time: 'Yesterday', xp: 25 },
    { type: 'lesson', name: { en: 'Ethiopian History', am: 'የኢትዮጵያ ታሪክ' }, subject: 'History', time: 'Yesterday', xp: 45 },
  ],
  weeklyData: [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 75 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 20 },
    { day: 'Sun', minutes: 0 },
  ],
  achievements: [
    { name: { en: 'First Steps', am: 'የመጀመሪያ እርምጃዎች' }, icon: '🌟', earned: true },
    { name: { en: 'Week Warrior', am: 'የሳምንት ተዋጊ' }, icon: '🔥', earned: true },
    { name: { en: 'Math Master', am: 'የሒሳብ ጌታ' }, icon: '🧮', earned: true },
    { name: { en: 'Science Explorer', am: 'የሳይንስ አሳሽ' }, icon: '🔬', earned: false },
    { name: { en: 'Perfect Score', am: 'ፍጹም ውጤት' }, icon: '💯', earned: false },
  ],
};

const ParentDashboard = () => {
  const { language, setLanguage } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const totalMinutes = childData.weeklyData.reduce((sum, day) => sum + day.minutes, 0);
  const avgMinutes = Math.round(totalMinutes / 7);
  const maxMinutes = Math.max(...childData.weeklyData.map(d => d.minutes));

  const navItems = [
    { icon: BarChart3, label: { en: 'Overview', am: 'አጠቃላይ እይታ' }, href: '/parent', active: true },
    { icon: BookOpen, label: { en: 'Progress', am: 'እድገት' }, href: '/parent/progress' },
    { icon: Clock, label: { en: 'Screen Time', am: 'የስክሪን ጊዜ' }, href: '/parent/time' },
    { icon: Award, label: { en: 'Achievements', am: 'ስኬቶች' }, href: '/parent/achievements' },
    { icon: Bell, label: { en: 'Notifications', am: 'ማሳወቂያዎች' }, href: '/parent/notifications' },
    { icon: CreditCard, label: { en: 'Subscription', am: 'ደንበኝነት' }, href: '/parent/subscription' },
    { icon: Settings, label: { en: 'Settings', am: 'ቅንብሮች' }, href: '/parent/settings' },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:transform-none',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 lg:h-20 px-4 flex items-center justify-between border-b border-sidebar-border">
            <Link to="/" className="flex items-center">
              <img src={kokebLogo} alt="Kokeb" className="h-10 w-auto" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Parent Label */}
          <div className="px-4 py-3 bg-accent/50">
            <p className="text-sm font-medium text-accent-foreground">
              {language === 'en' ? 'Parent Portal' : 'የወላጅ ፖርታል'}
            </p>
          </div>

          {/* Child Selector */}
          <div className="p-4 border-b border-sidebar-border">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                {childData.avatar}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{childData.name}</p>
                <p className="text-sm text-muted-foreground">Grade {childData.grade}</p>
              </div>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                      item.active
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label[language]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <LogOut className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Log Out' : 'ውጣ'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 lg:h-20 border-b border-border bg-card px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="font-display text-xl font-bold">
              {language === 'en' ? 'Dashboard' : 'ዳሽቦርድ'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
            >
              {language === 'en' ? 'አማ' : 'EN'}
            </Button>
            
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Total XP' : 'ጠቅላላ XP'}
                </span>
              </div>
              <p className="font-display text-2xl font-bold">{childData.xp.toLocaleString()}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl border border-border p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Day Streak' : 'የቀን ሰንሰለት'}
                </span>
              </div>
              <p className="font-display text-2xl font-bold">{childData.streak}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl border border-border p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'This Week' : 'በዚህ ሳምንት'}
                </span>
              </div>
              <p className="font-display text-2xl font-bold">{totalMinutes} min</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl border border-border p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Weekly Goal' : 'ሳምንታዊ ግብ'}
                </span>
              </div>
              <p className="font-display text-2xl font-bold">
                {childData.weeklyCompleted}/{childData.weeklyGoal}
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Weekly Activity Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-bold">
                    {language === 'en' ? 'Weekly Activity' : 'ሳምንታዊ እንቅስቃሴ'}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span>{avgMinutes} min/day avg</span>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-2 h-40">
                  {childData.weeklyData.map((day, i) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center h-28">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className={cn(
                            'w-full max-w-8 rounded-t-lg',
                            day.minutes > 0 ? 'bg-gradient-to-t from-primary to-primary/50' : 'bg-muted'
                          )}
                          style={{ minHeight: day.minutes > 0 ? '8px' : '4px' }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Subject Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="font-display text-lg font-bold mb-6">
                  {language === 'en' ? 'Subject Progress' : 'የትምህርት እድገት'}
                </h2>

                <div className="space-y-5">
                  {childData.subjects.map((subject, i) => (
                    <div key={subject.name.en}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{subject.name[language]}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {language === 'en' ? 'Last score:' : 'የመጨረሻ ውጤት:'} {subject.recentScore}%
                          </span>
                          <span className="font-bold">{subject.progress}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.progress}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                          className={cn('h-full rounded-full bg-gradient-to-r', subject.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="font-display text-lg font-bold mb-4">
                  {language === 'en' ? 'Recent Activity' : 'የቅርብ ጊዜ እንቅስቃሴ'}
                </h2>

                <div className="space-y-4">
                  {childData.recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center text-xs',
                        activity.type === 'lesson' && 'bg-blue-500/10 text-blue-500',
                        activity.type === 'quiz' && 'bg-green-500/10 text-green-500',
                        activity.type === 'game' && 'bg-purple-500/10 text-purple-500',
                      )}>
                        {activity.type === 'lesson' && '📖'}
                        {activity.type === 'quiz' && '✅'}
                        {activity.type === 'game' && '🎮'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{activity.name[language]}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">+{activity.xp} XP</p>
                        {activity.score && (
                          <p className="text-xs text-muted-foreground">{activity.score}%</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="font-display text-lg font-bold mb-4">
                  {language === 'en' ? 'Achievements' : 'ስኬቶች'}
                </h2>

                <div className="flex flex-wrap gap-3">
                  {childData.achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg',
                        achievement.earned ? 'bg-primary/10' : 'bg-muted opacity-50'
                      )}
                    >
                      <span className="text-lg">{achievement.icon}</span>
                      <span className="text-sm font-medium">{achievement.name[language]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* AI Insight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/30"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Star className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-bold">
                    {language === 'en' ? 'AI Insight' : 'AI ግንዛቤ'}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'en'
                    ? `${childData.name.split(' ')[0]} is doing great in Amharic! Consider encouraging more Science practice - it's their lowest scoring subject this week.`
                    : `${childData.name.split(' ')[0]} በአማርኛ በጣም ጥሩ እየሰራ ነው! ተጨማሪ የሳይንስ ልምምድ ማበረታታት ያስቡ - በዚህ ሳምንት በጣም ዝቅተኛ ውጤት ያለው ትምህርት ነው።`}
                </p>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;
