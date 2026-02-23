import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import kokebLogo from '@/assets/kokeb-logo.png';
import kokebLogoLight from '@/assets/kokeb-logo-light.png';
import { Button } from '@/components/ui/button';
import {
  Home,
  BookOpen,
  FlaskConical,
  Gamepad2,
  Lightbulb,
  Trophy,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Star,
  Flame,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/dashboard', icon: Home, labelEn: 'Home', labelAm: 'መነሻ' },
  { href: '/dashboard/subjects', icon: BookOpen, labelEn: 'Subjects', labelAm: 'ትምህርቶች' },
  { href: '/dashboard/labs', icon: FlaskConical, labelEn: 'Virtual Labs', labelAm: 'ምናባዊ ቤተሙከራ' },
  { href: '/dashboard/games', icon: Gamepad2, labelEn: 'Games', labelAm: 'ጨዋታዎች' },
  { href: '/dashboard/skills', icon: Lightbulb, labelEn: 'Life Skills', labelAm: 'ክህሎቶች' },
  { href: '/dashboard/leaderboard', icon: Trophy, labelEn: 'Leaderboard', labelAm: 'ደረጃ' },
  { href: '/dashboard/tutor', icon: MessageSquare, labelEn: 'AI Tutor', labelAm: 'AI አስተማሪ' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user data
  const user = {
    name: 'Abebe',
    grade: '8',
    xp: 2450,
    streak: 7,
    avatar: 'A',
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16 px-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link to="/dashboard" className="flex items-center">
          <img src={kokebLogoLight} alt="Kokeb" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
            {user.avatar}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 z-50 w-64 bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 lg:h-20 px-4 flex items-center justify-between border-b border-sidebar-border">
            <Link to="/dashboard" className="flex items-center">
              <img src={kokebLogo} alt="Kokeb" className="h-10 w-auto" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-sidebar-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Stats */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-bold text-lg">
                {user.avatar}
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-sidebar-foreground/70">
                  {language === 'en' ? `Grade ${user.grade}` : `ክፍል ${user.grade}`}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-sidebar-accent rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-sidebar-primary" />
                  <span className="text-xs text-sidebar-foreground/70">XP</span>
                </div>
                <p className="font-bold">{user.xp.toLocaleString()}</p>
              </div>
              <div className="bg-sidebar-accent rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="h-4 w-4 text-accent" />
                  <span className="text-xs text-sidebar-foreground/70">
                    {language === 'en' ? 'Streak' : 'ተከታታይ'}
                  </span>
                </div>
                <p className="font-bold">{user.streak} {language === 'en' ? 'days' : 'ቀናት'}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {language === 'en' ? item.labelEn : item.labelAm}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-sidebar-border space-y-1">
            <button
              onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground w-full transition-colors"
            >
              <Globe className="h-5 w-5" />
              {language === 'en' ? 'አማርኛ' : 'English'}
            </button>
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <Settings className="h-5 w-5" />
              {language === 'en' ? 'Settings' : 'ቅንብሮች'}
            </Link>
            <button
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground w-full transition-colors"
            >
              <LogOut className="h-5 w-5" />
              {language === 'en' ? 'Log Out' : 'ውጣ'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-20 px-6 items-center justify-between border-b border-border bg-card">
          <div>
            {/* Breadcrumb or page title can go here */}
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 hover:bg-muted rounded-lg px-3 py-2 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {user.avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? `Grade ${user.grade}` : `ክፍል ${user.grade}`}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile">
                    {language === 'en' ? 'Profile' : 'መገለጫ'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings">
                    {language === 'en' ? 'Settings' : 'ቅንብሮች'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  {language === 'en' ? 'Log Out' : 'ውጣ'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 pt-20 lg:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
