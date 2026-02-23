import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Keep the existing translation entries in the file but treat them as
// keyed records; `t()` will now always return the English value.
const translations: Record<string, Record<string, string>> = {
  // Navigation
  'nav.home': { en: 'Home', am: 'መነሻ' },
  'nav.subjects': { en: 'Subjects', am: 'ትምህርቶች' },
  'nav.labs': { en: 'Virtual Labs', am: 'ምናባዊ ቤተሙከራ' },
  'nav.games': { en: 'Games', am: 'ጨዋታዎች' },
  'nav.skills': { en: 'Life Skills', am: 'የህይወት ክህሎቶች' },
  'nav.pricing': { en: 'Pricing', am: 'ዋጋ' },
  'nav.about': { en: 'About', am: 'ስለ' },
  'nav.login': { en: 'Log In', am: 'ግባ' },
  'nav.signup': { en: 'Join Waitlist', am: 'ተመዝገብ' },

  // Hero Section Pre-launch
  'hero.badge': { en: 'Coming Soon Join the Waitlist', am: 'በቅርቡ ተመዝገብ' },
  'hero.title': { en: 'Every Student Deserves to', am: 'ሁሉም ተማሪ' },
  'hero.titleHighlight': { en: 'Shine ⭐', am: 'ማብራት ይገባዋል ⭐' },
  'hero.subtitle': { en: 'Kokeb is an AI-powered educational platform built for Ethiopian K-12 students. Personalized learning, gamified lessons, and virtual labs designed to make education as engaging as social media.', am: 'ኮከብ ለኢትዮጵያ K-12 ተማሪዎች የተሰራ በAI የሚንቀሳቀስ የትምህርት መድረክ ነው። ተማሪዎችን እንደ ማህበራዊ ሚዲያ ያሳታፊ ያደርገዋል።' },
  
  'hero.cta': { en: 'Join the Waitlist', am: 'ተመዝገብ' },
  'hero.ctaSecondary': { en: 'Watch Demo', am: 'ማሳያ ተመልከት' },
  'hero.emailPlaceholder': { en: 'Enter your email address', am: 'ኢሜይልዎን ያስገቡ' },
  'hero.noSpam': { en: 'No spam, ever. We\'ll only email you when Kokeb launches.', am: 'ስፓም የለም። ኮከብ ሲጀምር ብቻ እንልክልዎታለን።' },
  'hero.success': { en: 'You\'re on the list! We\'ll notify you at launch. ⭐', am: 'ተመዝግበዋል! ኮከብ ሲጀምር እናሳውቅዎታለን። ⭐' },
  'hero.stat1': { en: 'Ethiopian Students', am: 'የኢትዮጵያ ተማሪዎች' },
  'hero.stat2': { en: 'All Grades Covered', am: 'ሁሉም ክፍሎች' },
  'hero.stat3': { en: 'Languages', am: 'ቋንቋዎች' },

  // Problem Section
  'problem.badge': { en: 'The Crisis in Education', am: 'የትምህርት ቀውስ' },
  'problem.title': { en: 'A System That\'s Failing Millions', am: 'ሚሊዮኖችን እያስቸገረ ያለ ስርዓት' },
  'problem.subtitle': { en: 'Every year, the results of Ethiopia\'s Grade 12 national exam reveal an alarming reality. The problem isn\'t the students it\'s a system that cannot adapt to how they learn.', am: 'በየዓመቱ የ12ኛ ክፍል ብሔራዊ ፈተና ውጤት አስደንጋጭ ነው። ችግሩ ተማሪዎቹ አይደሉም  ስርዓቱ ነው።' },
  'problem.stat1': { en: 'of students passed the national exam', am: 'ተማሪዎች ብሔራዊ ፈተናውን ያለፉ' },
  'problem.stat2': { en: 'schools had zero university qualifiers', am: 'ት/ቤቶች ምንም ዩኒቨርሲቲ ብቁ ያልሆኑ' },
  'problem.stat3Value': { en: 'Millions', am: 'ሚሊዮኖች' },
  'problem.stat3': { en: 'of capable students left behind', am: 'ችሎታ ያላቸው ተማሪዎች ቀርተዋል' },
  'problem.quote': { en: 'This is not a child problem. This is a system problem.', am: 'ይህ የልጅ ችግር አይደለም። ይህ የስርዓት ችግር ነው።' },

  // Solution Section
  'solution.badge': { en: 'Meet Kokeb', am: 'ኮከብን ይወቁ' },
  'solution.title': { en: 'Education That Adapts to You', am: 'ለእርስዎ የሚስማማ ትምህርት' },
  'solution.subtitle': { en: 'Kokeb uses AI to meet each student where they are making learning engaging through gamified lessons, virtual labs, and personalized support at a fraction of the cost of private tutoring.', am: 'ኮከብ AI በመጠቀም ተማሪዎችን ባሉበት ደረጃ ያገኛቸዋል  ትምህርትን በጨዋታ፣ ምናባዊ ቤተሙከራ፣ እና ግላዊ ድጋፍ ያሳታፊ ያደርገዋል።' },

  'solution.adaptive.title': { en: 'AI-Adaptive Learning', am: 'AI ተስማሚ ትምህርት' },
  'solution.adaptive.desc': { en: 'AI monitors your pace, identifies knowledge gaps, and adjusts difficulty in real-time so you never fall behind or get bored.', am: 'AI ፍጥነትዎን ይከታተላል፣ ክፍተቶችን ይለያል፣ እና ችግሮችን ያስተካክላል።' },

  'solution.labs.title': { en: 'Virtual Science Labs', am: 'ምናባዊ የሳይንስ ቤተሙከራ' },
  'solution.labs.desc': { en: 'Simulate physics, chemistry, and biology experiments safely no equipment needed, just curiosity.', am: 'ፊዚክስ፣ ኬሚስትሪ፣ እና ባዮሎጂ ሙከራዎችን ያለ መሳሪያ በምናብ ያድርጉ።' },

  'solution.games.title': { en: 'Gamified Learning', am: 'የጨዋታ ትምህርት' },
  'solution.games.desc': { en: 'Earn XP, climb leaderboards, complete daily challenges, and unlock achievements that make studying addictive.', am: 'XP ያግኙ፣ ደረጃ ይውጡ፣ ዕለታዊ ተግዳሮቶችን ይሟሟሉ፣ እና ስኬቶችን ይክፈቱ።' },

  'solution.tutor.title': { en: 'AI Tutor 24/7', am: 'AI አስተማሪ 24/7' },
  'solution.tutor.desc': { en: 'A personal AI tutor that explains concepts in English or Amharic as many times as you need, whenever you need.', am: 'በእንግሊዝኛ ወይም አማርኛ ጽንሰ-ሐሳቦችን የሚያብራራ ግላዊ AI አስተማሪ  በማንኛውም ጊዜ።' },

  'solution.skills.title': { en: 'Life Skills Academy', am: 'የህይወት ክህሎት አካዳሚ' },
  'solution.skills.desc': { en: 'Beyond academics build critical thinking, communication, leadership, creativity, and financial literacy.', am: 'ከትምህርት ባሻገር ወሳኝ አስተሳሰብ፣ ግንኙነት፣ አመራር፣ ፈጠራ ይገንቡ።' },

  'solution.bilingual.title': { en: 'Bilingual Support', am: 'ባለሁለት ቋንቋ ድጋፍ' },
  'solution.bilingual.desc': { en: 'Full English and Amharic support throughout the platform learn in the language you\'re most comfortable with.', am: 'በመድረኩ ሙሉ እንግሊዝኛ እና አማርኛ ድጋፍ በሚመቸው ቋንቋ ተማር።' },

  // Subjects
  'subjects.title': { en: 'Full K-12 Curriculum', am: 'ሙሉ K-12 ስርዓተ ትምህርት' },
  'subjects.math': { en: 'Mathematics', am: 'ሂሳብ' },
  'subjects.physics': { en: 'Physics', am: 'ፊዚክስ' },
  'subjects.chemistry': { en: 'Chemistry', am: 'ኬሚስትሪ' },
  'subjects.biology': { en: 'Biology', am: 'ባዮሎጂ' },
  'subjects.geography': { en: 'Geography', am: 'ጂኦግራፊ' },
  'subjects.history': { en: 'History', am: 'ታሪክ' },
  'subjects.amharic': { en: 'Amharic', am: 'አማርኛ' },
  'subjects.science': { en: 'Science', am: 'ሳይንስ' },

  // Market Section
  'market.title': { en: 'A Massive Opportunity', am: 'ትልቅ ዕድል' },
  'market.subtitle': { en: 'The AI in education market is booming and Ethiopia is ready', am: 'በAI ትምህርት ገበያ እያደገ ነው  ኢትዮጵያ ዝግጁ ናት' },
  'market.metric1': { en: 'AI in Education Market', am: 'AI ትምህርት ገበያ' },
  'market.metric1Sub': { en: 'Projected by 2030 globally', am: 'በ2030 ዓለም አቀፍ ግምት' },
  'market.metric2': { en: 'Ethiopian Students', am: 'የኢትዮጵያ ተማሪዎች' },
  'market.metric2Sub': { en: 'Primary & secondary combined', am: 'የመጀመሪያ እና ሁለተኛ ደረጃ' },
  'market.metric3': { en: 'UN Goals Aligned', am: 'የተባ.ብ. ግቦች' },
  'market.metric3Sub': { en: 'Quality Education & Reduced Inequalities', am: 'ጥራት ያለው ትምህርት እና የተቀነሰ ልዩነት' },

  // Pricing
  'pricing.title': { en: 'Plans for Every Learner', am: 'ለሁሉም ተማሪ ዕቅድ' },
  'pricing.subtitle': { en: 'Choose the plan that fits your learning journey from essential tools to full access', am: 'ለትምህርት ጉዞዎ የሚስማማውን ዕቅድ ይምረጡ' },
  'pricing.monthly': { en: 'Monthly', am: 'ወርሃዊ' },
  'pricing.yearly': { en: 'Yearly', am: 'ዓመታዊ' },
  'pricing.save': { en: 'Save 20%', am: '20% ቆጥብ' },
  'pricing.comingSoon': { en: 'Pricing announced at launch', am: 'ዋጋው ሲጀምር ይገለጻል' },

  'plan.basic.name': { en: 'Basic', am: 'መሰረታዊ' },
  'plan.basic.desc': { en: 'Core learning for every student', am: 'ለሁሉም ተማሪ ዋና ትምህርት' },
  'plan.pro.name': { en: 'Premium', am: 'ፕሪሚየም' },
  'plan.pro.desc': { en: 'Full access to everything Kokeb offers', am: 'ኮከብ ያለውን ሁሉ ሙሉ መዳረሻ' },
  'plan.pro.popular': { en: 'Best Value', am: 'ምርጥ ዋጋ' },
  'plan.school.name': { en: 'Enterprise', am: 'ተቋማዊ' },
  'plan.school.desc': { en: 'For schools and organizations', am: 'ለት/ቤቶች እና ተቋማት' },

  // Founders
  'founders.title': { en: 'Meet the Co-Founders', am: 'ተባባሪ መስራቾችን ይወቁ' },
  'founders.subtitle': { en: 'Sisters who left promising careers to build the future of education in Ethiopia', am: 'ለኢትዮጵያ ትምህርት የወደፊት ተስፋ ለመገንባት ተስፋ ሰጪ ስራቸውን የተዉ እህትማማቾች' },
  'founders.lidiya.name': { en: 'Lidiya Mamo', am: 'ሊድያ ማሞ' },
  'founders.lidiya.role': { en: 'Co-Founder', am: 'ተባባሪ መስራች' },
  'founders.lidiya.tag1': { en: 'Software Developer', am: 'ሶፍትዌር ገንቢ' },
  'founders.lidiya.tag2': { en: 'Huawei Seeds for the Future Champion', am: 'Huawei Seeds for the Future ሻምፒዮን' },
  'founders.lidiya.story': { en: 'Lidiya is a software engineer and Global Huawei Seeds for the Future Champion who builds impactful digital solutions that solve real problems.', am: 'ለትምህርት ያላትን ጥልቅ ፍቅር ከተገነዘበች በኋላ በሌላ ዘርፍ ተስፋ ሰጪ ስታርትአፕን ትታ  አንዳንድ ጥሪዎች ለመተው በጣም ጠንካራ ናቸው።' },
  'founders.emnet.name': { en: 'Emnet Mamo', am: 'እምነት ማሞ' },
  'founders.emnet.role': { en: 'Co-Founder', am: 'ተባባሪ መስራች' },
  'founders.emnet.tag1': { en: 'Computer Engineer', am: 'ኮምፒውተር ኢንጂነር' },
  'founders.emnet.tag2': { en: 'Business Analyst', am: 'ቢዝነስ ተንታኝ' },
  'founders.emnet.story': { en: 'Emnet is a computer engineer and business analyst who focuses on product strategy and operational excellence to improve education access across Ethiopia.', am: 'ለኮከብ ጊዜዋን ለመስጠት ከፍተኛ ደመወዝ ያለውን ስራ ትታ  ሁሉም የኢትዮጵያ ልጅ ስርዓቱ ከሚሰጠው የተሻለ ይገባዋል ብላ ስለምታምን።' },
  'founders.mission': { en: 'Kokeb exists so every student can shine.', am: 'ኮከብ ሁሉም ተማሪ ማብራት እንዲችል ይኖራል።' },
  'founders.experience': { en: 'Through years of tutoring, we didn\'t just see academic struggles we saw a system that consistently fails the majority of learners. We couldn\'t look away.', am: 'ለዓመታት ስናስተምር የትምህርት ትግል ብቻ አልተመለከትንም  ለአብዛኛዎቹ ተማሪዎች የሚያስቸግር ስርዓት ተመለከትን። ዞር ብለን ማየት አልቻልንም።' },

  // CTA
  'cta.title': { en: 'Be the First to Experience Kokeb', am: 'ኮከብን የመጀመሪያ ሆነው ይሞክሩ' },
  'cta.subtitle': { en: 'Join our waitlist and be notified the moment we launch. Early supporters get exclusive benefits.', am: 'ተመዝግበው ስንጀምር ይረዱ። ቀደምት ደጋፊዎች ልዩ ጥቅሞችን ያገኛሉ።' },
  'cta.tagline': { en: 'Kokeb exists so every student can shine.', am: 'ኮከብ ሁሉም ተማሪ ማብራት እንዲችል ይኖራል።' },

  // Footer
  'footer.tagline': { en: 'AI-powered education for every Ethiopian student', am: 'ለሁሉም የኢትዮጵያ ተማሪ በAI የሚንቀሳቀስ ትምህርት' },
  'footer.platform': { en: 'Platform', am: 'መድረክ' },
  'footer.company': { en: 'Company', am: 'ኩባንያ' },
  'footer.support': { en: 'Support', am: 'ድጋፍ' },
  'footer.legal': { en: 'Legal', am: 'ህጋዊ' },
  'footer.rights': { en: 'All rights reserved', am: 'ሁሉም መብቶች የተጠበቁ ናቸው' },

  // Common
  'common.learnMore': { en: 'Learn More', am: 'ተጨማሪ እወቅ' },
  'common.getStarted': { en: 'Get Started', am: 'ጀምር' },
  'common.birr': { en: 'ETB', am: 'ብር' },
  'common.perMonth': { en: '/month', am: '/ወር' },
  'common.grades': { en: 'Grades', am: 'ክፍል' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
