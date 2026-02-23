import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Calculator,
  Brain,
  Puzzle,
  Zap,
  Trophy,
  Star,
  Clock,
  Users,
  Play,
  Lock,
  Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const games = [
  {
    id: 'math-speed',
    name: { en: 'Math Speed', am: 'የሂሳብ ፍጥነት' },
    desc: { en: 'Race against time solving equations', am: 'እኩልታዎችን እየፈታህ ከጊዜ ጋር ተወዳደር' },
    icon: Calculator,
    color: 'from-blue-500 to-blue-600',
    players: 1243,
    highScore: 850,
    xpReward: 30,
    unlocked: true,
    category: 'math',
  },
  {
    id: 'trivia-battle',
    name: { en: 'Trivia Battle', am: 'የእውቀት ውድድር' },
    desc: { en: 'Test your general knowledge', am: 'አጠቃላይ እውቀትህን ፈትን' },
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    players: 892,
    highScore: 920,
    xpReward: 40,
    unlocked: true,
    category: 'general',
  },
  {
    id: 'memory-match',
    name: { en: 'Memory Match', am: 'የማስታወስ ጨዋታ' },
    desc: { en: 'Match vocabulary and facts', am: 'ቃላትን እና እውነታዎችን አዛምድ' },
    icon: Puzzle,
    color: 'from-green-500 to-green-600',
    players: 1567,
    highScore: 780,
    xpReward: 25,
    unlocked: true,
    category: 'memory',
  },
  {
    id: 'quick-quiz',
    name: { en: 'Quick Quiz', am: 'ፈጣን ፈተና' },
    desc: { en: 'Answer questions before time runs out', am: 'ጊዜ ከማለቁ በፊት ጥያቄዎችን መልስ' },
    icon: Zap,
    color: 'from-amber-500 to-amber-600',
    players: 2341,
    highScore: 650,
    xpReward: 35,
    unlocked: true,
    category: 'quiz',
  },
  {
    id: 'science-puzzle',
    name: { en: 'Science Puzzles', am: 'የሳይንስ እንቆቅልሾች' },
    desc: { en: 'Solve scientific riddles', am: 'ሳይንሳዊ እንቆቅልሾችን ፍታ' },
    icon: Puzzle,
    color: 'from-pink-500 to-pink-600',
    players: 456,
    highScore: null,
    xpReward: 45,
    unlocked: false,
    category: 'science',
  },
  {
    id: 'history-quest',
    name: { en: 'History Quest', am: 'የታሪክ ጥያቄ' },
    desc: { en: 'Journey through Ethiopian history', am: 'በኢትዮጵያ ታሪክ ውስጥ ተጓዝ' },
    icon: Crown,
    color: 'from-cyan-500 to-cyan-600',
    players: 678,
    highScore: null,
    xpReward: 50,
    unlocked: false,
    category: 'history',
  },
];

const leaderboard = [
  { rank: 1, name: 'Dawit M.', xp: 12450, avatar: 'D' },
  { rank: 2, name: 'Sara T.', xp: 11890, avatar: 'S' },
  { rank: 3, name: 'Yonas K.', xp: 10234, avatar: 'Y' },
  { rank: 12, name: 'You', xp: 2450, avatar: 'A', isCurrentUser: true },
];

const Games = () => {
  const { language } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold mb-2">
              {language === 'en' ? 'Mini Games Arena' : 'ትንሽ ጨዋታዎች አውድ'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Learn while having fun! Earn XP and climb the leaderboard' 
                : 'እየተዝናናህ ተማር! XP አግኝ እና ደረጃውን ውጣ'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-card rounded-xl border border-border px-4 py-3">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Your Best' : 'ምርጥህ'}
                </p>
                <p className="font-bold">920</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-card rounded-xl border border-border px-4 py-3">
              <Star className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'XP Earned' : 'የተገኘ XP'}
                </p>
                <p className="font-bold">485</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Games Grid */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-lg font-bold">
              {language === 'en' ? 'Available Games' : 'ዝግጁ ጨዋታዎች'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300',
                    game.unlocked 
                      ? 'hover:border-primary/30 hover:shadow-lg' 
                      : 'opacity-60'
                  )}
                >
                  {/* Lock Overlay */}
                  {!game.unlocked && (
                    <div className="absolute inset-0 bg-background/70 backdrop-blur-sm z-10 flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? 'Complete more lessons' : 'ተጨማሪ ትምህርቶችን አጠናቅቅ'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Game Header */}
                  <div className={`bg-gradient-to-r ${game.color} p-4`}>
                    <div className="flex items-center justify-between">
                      <game.icon className="h-8 w-8 text-white" />
                      <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                        <Star className="h-4 w-4 text-white" />
                        <span className="text-sm font-bold text-white">{game.xpReward} XP</span>
                      </div>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="p-4">
                    <h3 className="font-display font-bold text-lg mb-1">
                      {game.name[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {game.desc[language]}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{game.players.toLocaleString()} {language === 'en' ? 'playing' : 'ተጫዋቾች'}</span>
                      </div>
                      {game.highScore && (
                        <div className="flex items-center gap-1 text-sm">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="font-bold">{game.highScore}</span>
                        </div>
                      )}
                    </div>

                    {game.unlocked && (
                      <Button className="w-full" asChild>
                        <Link to={`/dashboard/games/${game.id}`}>
                          <Play className="h-4 w-4 mr-2" />
                          {language === 'en' ? 'Play Now' : 'አሁን ተጫወት'}
                        </Link>
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Side Panel - Quick Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-bold">
                  {language === 'en' ? 'Top Players' : 'ምርጥ ተጫዋቾች'}
                </h2>
              </div>

              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg transition-colors',
                      player.isCurrentUser ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted'
                    )}
                  >
                    <span className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                      player.rank === 1 ? 'bg-amber-500 text-white' :
                      player.rank === 2 ? 'bg-gray-400 text-white' :
                      player.rank === 3 ? 'bg-amber-700 text-white' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {player.rank}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                      {player.avatar}
                    </div>
                    <div className="flex-1">
                      <p className={cn('font-semibold text-sm', player.isCurrentUser && 'text-primary')}>
                        {player.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-primary" />
                        <span className="text-xs text-muted-foreground">{player.xp.toLocaleString()} XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/dashboard/leaderboard">
                  {language === 'en' ? 'View Full Leaderboard' : 'ሙሉ ደረጃን ተመልከት'}
                </Link>
              </Button>
            </div>

            {/* Daily Challenge */}
            <div className="bg-gradient-to-br from-accent to-accent/80 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5" />
                <span className="font-bold">
                  {language === 'en' ? 'Daily Challenge' : 'ዕለታዊ ተግዳሮት'}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">
                {language === 'en' ? 'Math Marathon' : 'የሂሳብ ማራቶን'}
              </h3>
              <p className="text-sm text-white/80 mb-4">
                {language === 'en' 
                  ? 'Solve 20 equations in 5 minutes' 
                  : 'በ5 ደቂቃ ውስጥ 20 እኩልታዎችን ፍታ'}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-white" />
                  <span className="font-bold">100 XP</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>12:45:32</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Games;
