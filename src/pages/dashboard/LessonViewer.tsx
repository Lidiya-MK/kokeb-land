import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  XCircle,
  Lightbulb,
  BookOpen,
  Trophy,
  Play,
  Pause,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Dummy lesson data
const lessonData = {
  id: 'fractions-intro',
  title: { en: 'Introduction to Fractions', am: 'ወደ ክፍልፋዮች መግቢያ' },
  subject: { en: 'Mathematics', am: 'ሒሳብ' },
  grade: '5',
  xpReward: 50,
  sections: [
    {
      type: 'concept',
      title: { en: 'What is a Fraction?', am: 'ክፍልፋይ ምንድን ነው?' },
      content: {
        en: 'A fraction represents a part of a whole. When we divide something into equal parts, each part is a fraction of the whole.\n\nFor example, if you cut a pizza into 4 equal slices and take 1 slice, you have 1/4 (one-fourth) of the pizza.',
        am: 'ክፍልፋይ የአንድ ሙሉ አካል ክፍል ነው። አንድን ነገር ወደ እኩል ክፍሎች ስንከፋፍል, እያንዳንዱ ክፍል የሙሉው ክፍልፋይ ነው።\n\nለምሳሌ: ፒዛን ወደ 4 እኩል ቁርጥራጮች ብትቆርጥ እና 1 ቁራጭ ብትወስድ፣ 1/4 (አንድ አራተኛ) ፒዛ አለህ።',
      },
      image: '🍕',
    },
    {
      type: 'concept',
      title: { en: 'Parts of a Fraction', am: 'የክፍልፋይ ክፍሎች' },
      content: {
        en: 'Every fraction has two parts:\n\n**Numerator** (top number): Shows how many parts we have\n**Denominator** (bottom number): Shows how many equal parts the whole is divided into\n\nIn 3/4:\n• 3 is the numerator (we have 3 parts)\n• 4 is the denominator (whole divided into 4 parts)',
        am: 'እያንዳንዱ ክፍልፋይ ሁለት ክፍሎች አሉት:\n\n**ቁጥር** (የላይኛው ቁጥር): ስንት ክፍሎች እንዳሉን ያሳያል\n**አማካይ** (የታች ቁጥር): ሙሉው በስንት እኩል ክፍሎች እንደተከፋፈለ ያሳያል',
      },
      image: '📊',
    },
    {
      type: 'interactive',
      title: { en: 'Try It Yourself!', am: 'እራስህ ሞክር!' },
      instruction: {
        en: 'Click on the pizza slices to select 2/4 of the pizza',
        am: 'የፒዛ ቁራጮችን ጠቅ አድርግ 2/4 ፒዛ ለመምረጥ',
      },
    },
    {
      type: 'quiz',
      question: { en: 'What does the denominator tell us?', am: 'አመላካቹ ምን ይነግረናል?' },
      options: [
        { en: 'How many parts we have', am: 'ስንት ክፍሎች እንዳሉን' },
        { en: 'How many equal parts the whole is divided into', am: 'ሙሉው በስንት እኩል ክፍሎች እንደተከፋፈለ' },
        { en: 'The total number', am: 'አጠቃላይ ቁጥር' },
        { en: 'The fraction itself', am: 'ክፍልፋዩ ራሱ' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'The denominator (bottom number) tells us how many equal parts the whole is divided into.',
        am: 'አመላካቹ (የታች ቁጥር) ሙሉው በስንት እኩል ክፍሎች እንደተከፋፈለ ይነግረናል።',
      },
    },
    {
      type: 'quiz',
      question: { en: 'In the fraction 3/8, what is the numerator?', am: 'በክፍልፋይ 3/8 ውስጥ ቁጥሩ ምንድን ነው?' },
      options: [
        { en: '8', am: '8' },
        { en: '3', am: '3' },
        { en: '11', am: '11' },
        { en: '5', am: '5' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'The numerator is the top number. In 3/8, the numerator is 3.',
        am: 'ቁጥሩ የላይኛው ቁጥር ነው። በ3/8 ውስጥ ቁጥሩ 3 ነው።',
      },
    },
  ],
};

const LessonViewer = () => {
  const { language } = useLanguage();
  const { subjectId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedSlices, setSelectedSlices] = useState<number[]>([]);
  const [lessonComplete, setLessonComplete] = useState(false);

  const section = lessonData.sections[currentSection];
  const progress = ((currentSection + 1) / lessonData.sections.length) * 100;
  const totalQuizzes = lessonData.sections.filter(s => s.type === 'quiz').length;

  const handleNext = () => {
    if (currentSection < lessonData.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setSelectedSlices([]);
    } else {
      setLessonComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (section.type === 'quiz' && index === section.correctIndex) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleSliceClick = (index: number) => {
    if (selectedSlices.includes(index)) {
      setSelectedSlices(selectedSlices.filter(i => i !== index));
    } else if (selectedSlices.length < 2) {
      setSelectedSlices([...selectedSlices, index]);
    }
  };

  if (lessonComplete) {
    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center py-12"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">
            {language === 'en' ? 'Lesson Complete!' : 'ትምህርት ተጠናቋል!'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {language === 'en'
              ? `You got ${correctAnswers} out of ${totalQuizzes} questions correct`
              : `${totalQuizzes} ከሚለው ${correctAnswers} ጥያቄዎች በትክክል መልሰሃል`}
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="h-8 w-8 text-primary fill-primary" />
              <span className="font-display text-4xl font-bold">+{lessonData.xpReward}</span>
              <span className="text-xl text-muted-foreground">XP</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Added to your total' : 'ወደ ጠቅላላህ ተጨምሯል'}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/dashboard/subjects')}>
              <BookOpen className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Back to Subjects' : 'ወደ ትምህርቶች ተመለስ'}
            </Button>
            <Button onClick={() => {
              setCurrentSection(0);
              setLessonComplete(false);
              setCorrectAnswers(0);
              setSelectedAnswer(null);
              setShowExplanation(false);
            }}>
              <Play className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Review Lesson' : 'ትምህርቱን እንደገና ተመልከት'}
            </Button>
          </div>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Back' : 'ተመለስ'}
          </Button>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            <span className="font-bold">+{lessonData.xpReward} XP</span>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-1">
            {lessonData.subject[language]} • Grade {lessonData.grade}
          </p>
          <h1 className="font-display text-2xl lg:text-3xl font-bold">
            {lessonData.title[language]}
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              {language === 'en' ? 'Progress' : 'እድገት'}
            </span>
            <span className="font-medium">
              {currentSection + 1} / {lessonData.sections.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-card border border-border rounded-2xl p-6 lg:p-8 mb-6"
          >
            {section.type === 'concept' && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">{section.image}</div>
                  <h2 className="font-display text-xl font-bold">
                    {section.title[language]}
                  </h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {section.content[language].split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 text-foreground/90 leading-relaxed">
                      {paragraph.split('**').map((part, j) => 
                        j % 2 === 1 ? <strong key={j} className="text-primary">{part}</strong> : part
                      )}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {section.type === 'interactive' && (
              <div className="text-center">
                <h2 className="font-display text-xl font-bold mb-4">
                  {section.title[language]}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {section.instruction[language]}
                </p>

                {/* Interactive Pizza */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleSliceClick(i)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'absolute w-24 h-24 transition-all duration-200',
                        i === 0 && 'top-0 left-0 rounded-tl-full origin-bottom-right',
                        i === 1 && 'top-0 right-0 rounded-tr-full origin-bottom-left',
                        i === 2 && 'bottom-0 right-0 rounded-br-full origin-top-left',
                        i === 3 && 'bottom-0 left-0 rounded-bl-full origin-top-right',
                        selectedSlices.includes(i)
                          ? 'bg-primary'
                          : 'bg-gradient-to-br from-amber-400 to-amber-500'
                      )}
                      style={{
                        clipPath: i === 0 ? 'polygon(100% 100%, 0 100%, 0 0)' :
                                  i === 1 ? 'polygon(100% 100%, 100% 0, 0 0)' :
                                  i === 2 ? 'polygon(0 0, 100% 0, 100% 100%)' :
                                  'polygon(0 0, 0 100%, 100% 100%)',
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/80" />
                  </div>
                </div>

                <p className="text-lg font-medium">
                  {language === 'en' ? 'Selected:' : 'ተመርጠዋል:'} {selectedSlices.length}/4
                </p>
                {selectedSlices.length === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center justify-center gap-2 text-success"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    <span>{language === 'en' ? 'Correct! 2/4 = 1/2' : 'ትክክል! 2/4 = 1/2'}</span>
                  </motion.div>
                )}
              </div>
            )}

            {section.type === 'quiz' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {language === 'en' ? 'Quick Check' : 'ፈጣን ምርመራ'}
                  </span>
                </div>
                
                <h2 className="font-display text-xl font-bold mb-6">
                  {section.question[language]}
                </h2>

                <div className="space-y-3">
                  {section.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      whileHover={!showExplanation ? { scale: 1.02 } : {}}
                      whileTap={!showExplanation ? { scale: 0.98 } : {}}
                      className={cn(
                        'w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3',
                        !showExplanation && 'hover:border-primary/50 hover:bg-primary/5',
                        showExplanation && index === section.correctIndex && 'border-success bg-success/10',
                        showExplanation && selectedAnswer === index && index !== section.correctIndex && 'border-destructive bg-destructive/10',
                        !showExplanation && selectedAnswer === index && 'border-primary bg-primary/10'
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                        showExplanation && index === section.correctIndex
                          ? 'bg-success text-white'
                          : showExplanation && selectedAnswer === index && index !== section.correctIndex
                          ? 'bg-destructive text-white'
                          : 'bg-muted'
                      )}>
                        {showExplanation && index === section.correctIndex ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : showExplanation && selectedAnswer === index && index !== section.correctIndex ? (
                          <XCircle className="h-5 w-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="flex-1">{option[language]}</span>
                    </motion.button>
                  ))}
                </div>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'mt-6 p-4 rounded-xl',
                      selectedAnswer === section.correctIndex
                        ? 'bg-success/10 border border-success/30'
                        : 'bg-primary/10 border border-primary/30'
                    )}
                  >
                    <p className="font-medium mb-1">
                      {selectedAnswer === section.correctIndex
                        ? (language === 'en' ? '🎉 Correct!' : '🎉 ትክክል!')
                        : (language === 'en' ? '💡 Not quite right' : '💡 ትክክል አይደለም')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {section.explanation[language]}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentSection === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Previous' : 'ቀዳሚ'}
          </Button>

          <Button
            onClick={handleNext}
            disabled={section.type === 'quiz' && !showExplanation}
          >
            {currentSection === lessonData.sections.length - 1
              ? (language === 'en' ? 'Complete' : 'ጨርስ')
              : (language === 'en' ? 'Next' : 'ቀጣይ')}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LessonViewer;
