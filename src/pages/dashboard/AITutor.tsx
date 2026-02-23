import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles, BookOpen, HelpCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  { en: "Explain Newton's first law", am: 'የኒውተንን የመጀመሪያ ህግ አብራራ' },
  { en: 'How do I solve quadratic equations?', am: 'ኳድራቲክ እኩልታዎችን እንዴት እፈታለሁ?' },
  { en: 'What is photosynthesis?', am: 'ፎቶሲንተሲስ ምንድን ነው?' },
  { en: 'Help me understand chemical bonds', am: 'ኬሚካላዊ ትስስሮችን ለመረዳት እርዳኝ' },
];

const AITutor = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'en' 
        ? "Hi! 👋 I'm Kokeb, your AI tutor. I'm here to help you with any subject - Math, Physics, Chemistry, Biology, History, or anything else you're studying. Ask me anything!"
        : "ሰላም! 👋 እኔ ኮከብ ነኝ፣ የእርስዎ AI አስተማሪ። በማንኛውም ትምህርት - ሂሳብ፣ ፊዚክስ፣ ኬሚስትሪ፣ ባዮሎጂ፣ ታሪክ ወይም እየተማርህ ባለው ማንኛውም ነገር ልረዳህ እዚህ ነኝ። ማንኛውንም ነገር ጠይቀኝ!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        en: [
          "That's a great question! Let me explain this step by step...",
          "I'd be happy to help you understand this concept better. Here's what you need to know:",
          "Let me break this down for you in a simple way:",
        ],
        am: [
          "ጥሩ ጥያቄ ነው! ይህንን ደረጃ በደረጃ ላብራራ...",
          "ይህንን ጽንሰ-ሐሳብ በተሻለ ሁኔታ እንድትረዱ ልረዳዎ ደስ ይለኛል። ማወቅ የሚፈልጉት ይኸው:",
          "ይህንን በቀላል መንገድ ልሰብርልዎ:",
        ],
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[language][Math.floor(Math.random() * responses[language].length)] + 
          "\n\n" + 
          (language === 'en' 
            ? "This is a demo response. In the full version, I'll provide detailed explanations tailored to your grade level, with examples and practice problems to help you master this topic."
            : "ይህ የማሳያ ምላሽ ነው። በሙሉ ስሪት ውስጥ፣ ለእርስዎ የክፍል ደረጃ የተበጁ ዝርዝር ማብራሪያዎችን፣ ከምሳሌዎች እና ልምምድ ችግሮች ጋር ይህንን ርዕስ እንዲቆጣጠሩ ለማገዝ እሰጣለሁ።"),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-10rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-2xl font-bold flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              {language === 'en' ? 'Kokeb AI Tutor' : 'ኮከብ AI አስተማሪ'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? '24/7 help in English or Amharic' 
                : '24/7 እርዳታ በእንግሊዝኛ ወይም በአማርኛ'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            {language === 'en' ? 'Online' : 'በመስመር ላይ'}
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                )}>
                  {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3',
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                    : 'bg-muted rounded-tl-sm'
                )}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                {language === 'en' ? 'Try asking:' : 'እነዚህን ሞክር:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(q[language])}
                    className="px-3 py-1.5 rounded-full bg-muted text-sm hover:bg-muted/80 transition-colors"
                  >
                    {q[language]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'en' ? 'Ask me anything...' : 'ማንኛውንም ነገር ጠይቀኝ...'}
                className="flex-1"
                disabled={isTyping}
              />
              <Button type="submit" disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <BookOpen className="h-4 w-4" />
            {language === 'en' ? 'Explain my lesson' : 'ትምህርቴን አብራራ'}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            {language === 'en' ? 'Help with homework' : 'በቤት ስራ እርዳኝ'}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            {language === 'en' ? 'Practice problems' : 'የልምምድ ችግሮች'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AITutor;
