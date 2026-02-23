import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Star, Eye, EyeOff, Mail, Lock, User, GraduationCap, Users, Building2, ChevronRight, ChevronLeft } from 'lucide-react';
import kokebLogoLight from '@/assets/kokeb-logo-light.png';
import { cn } from '@/lib/utils';

type UserType = 'student' | 'parent' | 'school';
type AgeGroup = 'young' | 'teen';

const grades = {
  young: ['K', '1', '2', '3', '4', '5', '6'],
  teen: ['7', '8', '9', '10', '11', '12'],
};

const Signup = () => {
  const { language, setLanguage } = useLanguage();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    parentEmail: '',
    schoolName: '',
    studentCount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', { userType, ageGroup, selectedGrade, formData });
  };

  const userTypes = [
    {
      id: 'student' as UserType,
      icon: GraduationCap,
      title: language === 'en' ? "I'm a Student" : 'ተማሪ ነኝ',
      desc: language === 'en' ? 'Start learning and earning XP' : 'መማር ጀምር እና XP አግኝ',
    },
    {
      id: 'parent' as UserType,
      icon: Users,
      title: language === 'en' ? "I'm a Parent" : 'ወላጅ ነኝ',
      desc: language === 'en' ? 'Monitor your child\'s progress' : 'የልጅዎን እድገት ይከታተሉ',
    },
    {
      id: 'school' as UserType,
      icon: Building2,
      title: language === 'en' ? 'School Account' : 'የትምህርት ቤት አካውንት',
      desc: language === 'en' ? 'Bulk subscriptions for students' : 'ለተማሪዎች የቡድን ምዝገባ',
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center mb-8">
            <img src={kokebLogoLight} alt="Kokeb" className="h-12 w-auto" />
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  step >= s 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                )}>
                  {s}
                </div>
                {s < 3 && <div className={cn(
                  'w-8 h-0.5 transition-colors',
                  step > s ? 'bg-primary' : 'bg-muted'
                )} />}
              </div>
            ))}
          </div>

          {/* Step 1: User Type Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="font-display text-3xl font-bold mb-2">
                {language === 'en' ? 'Join Kokeb' : 'ኮከብን ተቀላቀል'}
              </h1>
              <p className="text-muted-foreground mb-8">
                {language === 'en' ? 'Choose your account type' : 'የአካውንትህን አይነት ምረጥ'}
              </p>

              <div className="space-y-4">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setUserType(type.id);
                      setStep(2);
                    }}
                    className={cn(
                      'w-full p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all flex items-center gap-4 text-left',
                      userType === type.id && 'border-primary bg-primary/5'
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <type.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{type.title}</h3>
                      <p className="text-sm text-muted-foreground">{type.desc}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Grade Selection (for students) or Additional Info */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
              >
                <ChevronLeft className="h-4 w-4" />
                {language === 'en' ? 'Back' : 'ተመለስ'}
              </button>

              {userType === 'student' && (
                <>
                  <h1 className="font-display text-3xl font-bold mb-2">
                    {language === 'en' ? 'Select Your Grade' : 'ክፍልህን ምረጥ'}
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    {language === 'en' ? 'This helps us personalize your learning' : 'ይህ ትምህርትህን ለማስተካከል ይረዳናል'}
                  </p>

                  {/* Age Group Toggle */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setAgeGroup('young')}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-xl font-medium transition-all',
                        ageGroup === 'young'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      )}
                    >
                      K-6 ({language === 'en' ? 'Ages 5-12' : 'ዕድሜ 5-12'})
                    </button>
                    <button
                      onClick={() => setAgeGroup('teen')}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-xl font-medium transition-all',
                        ageGroup === 'teen'
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      )}
                    >
                      7-12 ({language === 'en' ? 'Ages 13-18' : 'ዕድሜ 13-18'})
                    </button>
                  </div>

                  {/* Grade Selection */}
                  {ageGroup && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-4 gap-3 mb-8"
                    >
                      {grades[ageGroup].map((grade) => (
                        <button
                          key={grade}
                          onClick={() => setSelectedGrade(grade)}
                          className={cn(
                            'py-4 rounded-xl font-bold text-lg transition-all',
                            selectedGrade === grade
                              ? ageGroup === 'young'
                                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                                : 'bg-secondary text-secondary-foreground shadow-lg scale-105'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          )}
                        >
                          {grade === 'K' ? 'KG' : grade}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  <Button
                    onClick={() => setStep(3)}
                    disabled={!selectedGrade}
                    className="w-full h-12"
                  >
                    {language === 'en' ? 'Continue' : 'ቀጥል'}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}

              {userType === 'parent' && (
                <>
                  <h1 className="font-display text-3xl font-bold mb-2">
                    {language === 'en' ? 'Parent Information' : 'የወላጅ መረጃ'}
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    {language === 'en' ? 'Set up your monitoring account' : 'የክትትል አካውንትዎን ያዘጋጁ'}
                  </p>
                  
                  <Button
                    onClick={() => setStep(3)}
                    className="w-full h-12"
                  >
                    {language === 'en' ? 'Continue' : 'ቀጥል'}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}

              {userType === 'school' && (
                <>
                  <h1 className="font-display text-3xl font-bold mb-2">
                    {language === 'en' ? 'School Information' : 'የትምህርት ቤት መረጃ'}
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    {language === 'en' ? 'Tell us about your institution' : 'ስለ ተቋምዎ ይንገሩን'}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'School Name' : 'የትምህርት ቤት ስም'}</Label>
                      <Input
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        placeholder={language === 'en' ? 'Enter school name' : 'የትምህርት ቤት ስም ያስገቡ'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Estimated Students' : 'ግምታዊ ተማሪዎች'}</Label>
                      <Input
                        name="studentCount"
                        type="number"
                        value={formData.studentCount}
                        onChange={handleChange}
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(3)}
                    className="w-full h-12"
                  >
                    {language === 'en' ? 'Continue' : 'ቀጥል'}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
            </motion.div>
          )}

          {/* Step 3: Account Details */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
              >
                <ChevronLeft className="h-4 w-4" />
                {language === 'en' ? 'Back' : 'ተመለስ'}
              </button>

              <h1 className="font-display text-3xl font-bold mb-2">
                {language === 'en' ? 'Create Account' : 'አካውንት ፍጠር'}
              </h1>
              <p className="text-muted-foreground mb-8">
                {language === 'en' ? 'Almost there! Enter your details' : 'ከማለቅህ ቀርቧል! ዝርዝሮችህን አስገባ'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {language === 'en' ? 'Full Name' : 'ሙሉ ስም'}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Your name' : 'ስምህ'}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'en' ? 'Email' : 'ኢሜይል'}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    {language === 'en' ? 'Password' : 'የይለፍ ቃል'}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {userType === 'student' && ageGroup === 'young' && (
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">
                      {language === 'en' ? "Parent's Email" : 'የወላጅ ኢሜይል'}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="parentEmail"
                        name="parentEmail"
                        type="email"
                        value={formData.parentEmail}
                        onChange={handleChange}
                        placeholder="parent@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' 
                        ? 'Required for students under 13' 
                        : 'ከ13 ዓመት በታች ለሆኑ ተማሪዎች ያስፈልጋል'}
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 mt-6"
                >
                  {language === 'en' ? 'Create Account' : 'አካውንት ፍጠር'}
                  <Star className="ml-2 h-5 w-5" />
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {language === 'en' ? 'By signing up, you agree to our ' : 'በመመዝገብ, የእኛን '}
                <Link to="/terms" className="text-primary hover:underline">
                  {language === 'en' ? 'Terms' : 'ውሎች'}
                </Link>
                {' '}
                {language === 'en' ? 'and' : 'እና'}
                {' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  {language === 'en' ? 'Privacy Policy' : 'የግላዊነት ፖሊሲ'}
                </Link>
              </p>
            </motion.div>
          )}

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {language === 'en' ? 'Already have an account?' : 'አካውንት አለህ?'}{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              {language === 'en' ? 'Sign in' : 'ግባ'}
            </Link>
          </p>

          {/* Language Toggle */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {language === 'en' ? '🇪🇹 አማርኛ' : '🇬🇧 English'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-accent items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Star className="h-5 w-5 text-white/40 fill-white/20" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative text-center text-white max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Star className="h-12 w-12 text-white fill-white/30" />
          </div>
          <h2 className="font-display text-3xl font-bold mb-4">
            {language === 'en' ? 'Start Your Star Journey' : 'የኮከብ ጉዞህን ጀምር'}
          </h2>
          <p className="text-white/80">
            {language === 'en' 
              ? 'Join thousands of Ethiopian students learning smarter, not harder!' 
              : 'በብልህ የሚማሩ በሺዎች የኢትዮጵያ ተማሪዎችን ተቀላቀል!'}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
