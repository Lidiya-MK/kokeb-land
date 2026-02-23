import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Trophy, Flame, Medal, Crown, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const weeklyLeaders = [
  { rank: 1, name: 'Dawit M.', grade: '8', xp: 2450, streak: 14, avatar: 'D' },
  { rank: 2, name: 'Sara T.', grade: '8', xp: 2280, streak: 12, avatar: 'S' },
  { rank: 3, name: 'Yonas K.', grade: '8', xp: 2150, streak: 10, avatar: 'Y' },
  { rank: 4, name: 'Hanna A.', grade: '8', xp: 1980, streak: 8, avatar: 'H' },
  { rank: 5, name: 'Biruk T.', grade: '8', xp: 1875, streak: 7, avatar: 'B' },
  { rank: 6, name: 'Meron G.', grade: '8', xp: 1720, streak: 11, avatar: 'M' },
  { rank: 7, name: 'Abel S.', grade: '8', xp: 1650, streak: 5, avatar: 'A' },
  { rank: 8, name: 'Tigist W.', grade: '8', xp: 1580, streak: 6, avatar: 'T' },
  { rank: 9, name: 'Henok B.', grade: '8', xp: 1450, streak: 4, avatar: 'H' },
  { rank: 10, name: 'Lidya K.', grade: '8', xp: 1380, streak: 9, avatar: 'L' },
];

const allTimeLeaders = [
  { rank: 1, name: 'Dawit M.', grade: '8', xp: 45620, streak: 45, avatar: 'D' },
  { rank: 2, name: 'Sara T.', grade: '8', xp: 42890, streak: 38, avatar: 'S' },
  { rank: 3, name: 'Yonas K.', grade: '8', xp: 38450, streak: 32, avatar: 'Y' },
  { rank: 4, name: 'Hanna A.', grade: '8', xp: 35780, streak: 28, avatar: 'H' },
  { rank: 5, name: 'Biruk T.', grade: '8', xp: 32150, streak: 25, avatar: 'B' },
];

const currentUser = {
  rank: 12,
  name: 'Abebe',
  grade: '8',
  xp: 2450,
  streak: 7,
  avatar: 'A',
};

const badges = [
  { id: 'math-master', name: { en: 'Math Master', am: 'የሂሳብ ጌታ' }, icon: '🧮', earned: true, date: '2024-01-15' },
  { id: 'streak-7', name: { en: '7-Day Streak', am: '7 ቀን ተከታታይ' }, icon: '🔥', earned: true, date: '2024-01-20' },
  { id: 'quiz-ace', name: { en: 'Quiz Ace', am: 'የፈተና ኤስ' }, icon: '✨', earned: true, date: '2024-01-18' },
  { id: 'science-explorer', name: { en: 'Science Explorer', am: 'የሳይንስ አሳሽ' }, icon: '🔬', earned: false },
  { id: 'history-buff', name: { en: 'History Buff', am: 'የታሪክ አዋቂ' }, icon: '📚', earned: false },
  { id: 'streak-30', name: { en: '30-Day Streak', am: '30 ቀን ተከታታይ' }, icon: '💎', earned: false },
];

const Leaderboard = () => {
  const { language } = useLanguage();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-amber-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 border-amber-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-400/5 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-700/20 to-amber-700/5 border-amber-700/30';
      default:
        return '';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold mb-2">
            {language === 'en' ? 'Leaderboard & Achievements' : 'ደረጃ እና ስኬቶች'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Compete with classmates and earn badges' 
              : 'ከክፍል ጓደኞችህ ጋር ተወዳደር እና ባጆች አግኝ'}
          </p>
        </div>

        {/* Current User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-secondary to-secondary/80 rounded-xl p-6 text-secondary-foreground"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl">
                {currentUser.avatar}
              </div>
              <div>
                <p className="text-secondary-foreground/70 text-sm">
                  {language === 'en' ? 'Your Ranking' : 'ደረጃህ'}
                </p>
                <p className="font-display text-3xl font-bold">#{currentUser.rank}</p>
                <p className="text-sm text-secondary-foreground/70">
                  {language === 'en' ? `Grade ${currentUser.grade}` : `ክፍል ${currentUser.grade}`}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display text-2xl font-bold">{currentUser.xp.toLocaleString()}</p>
                <p className="text-xs text-secondary-foreground/70">XP</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="h-5 w-5 text-accent" />
                </div>
                <p className="font-display text-2xl font-bold">{currentUser.streak}</p>
                <p className="text-xs text-secondary-foreground/70">
                  {language === 'en' ? 'Streak' : 'ተከታታይ'}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <p className="font-display text-2xl font-bold">+3</p>
                <p className="text-xs text-secondary-foreground/70">
                  {language === 'en' ? 'This Week' : 'በዚህ ሳምንት'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-card rounded-xl border border-border"
          >
            <Tabs defaultValue="weekly" className="w-full">
              <div className="px-6 pt-6">
                <TabsList className="w-full">
                  <TabsTrigger value="weekly" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'This Week' : 'በዚህ ሳምንት'}
                  </TabsTrigger>
                  <TabsTrigger value="alltime" className="flex-1">
                    <Trophy className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'All Time' : 'ሁሉም ጊዜ'}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="weekly" className="p-6 pt-4">
                <div className="space-y-2">
                  {weeklyLeaders.map((player, index) => (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        'flex items-center gap-4 p-3 rounded-xl border border-transparent transition-colors',
                        getRankBg(player.rank),
                        player.rank > 3 && 'hover:bg-muted'
                      )}
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankIcon(player.rank)}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                        {player.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'en' ? `Grade ${player.grade}` : `ክፍል ${player.grade}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-accent" />
                          <span>{player.streak}</span>
                        </div>
                        <div className="flex items-center gap-1 font-bold">
                          <Star className="h-4 w-4 text-primary" />
                          <span>{player.xp.toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="alltime" className="p-6 pt-4">
                <div className="space-y-2">
                  {allTimeLeaders.map((player, index) => (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        'flex items-center gap-4 p-3 rounded-xl border border-transparent transition-colors',
                        getRankBg(player.rank),
                        player.rank > 3 && 'hover:bg-muted'
                      )}
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankIcon(player.rank)}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                        {player.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'en' ? `Grade ${player.grade}` : `ክፍል ${player.grade}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 font-bold">
                        <Star className="h-4 w-4 text-primary" />
                        <span>{player.xp.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h2 className="font-display text-lg font-bold mb-4">
              {language === 'en' ? 'Your Badges' : 'ባጆችህ'}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: badge.earned ? 1.1 : 1 }}
                  className={cn(
                    'aspect-square rounded-xl flex flex-col items-center justify-center p-2 text-center transition-all',
                    badge.earned 
                      ? 'bg-primary/10 border border-primary/30' 
                      : 'bg-muted opacity-50'
                  )}
                >
                  <span className="text-2xl mb-1">{badge.icon}</span>
                  <span className="text-xs font-medium leading-tight">
                    {badge.name[language]}
                  </span>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              {language === 'en' 
                ? `${badges.filter(b => b.earned).length}/${badges.length} earned` 
                : `${badges.filter(b => b.earned).length}/${badges.length} ተገኝቷል`}
            </p>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
