import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Subjects from "./pages/dashboard/Subjects";
import VirtualLabs from "./pages/dashboard/VirtualLabs";
import Games from "./pages/dashboard/Games";
import LifeSkills from "./pages/dashboard/LifeSkills";
import Leaderboard from "./pages/dashboard/Leaderboard";
import AITutor from "./pages/dashboard/AITutor";
import LessonViewer from "./pages/dashboard/LessonViewer";
import ParentDashboard from "./pages/parent/ParentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/subjects" element={<Subjects />} />
            <Route path="/dashboard/subjects/:subjectId/lesson/:lessonId" element={<LessonViewer />} />
            <Route path="/dashboard/labs" element={<VirtualLabs />} />
            <Route path="/dashboard/games" element={<Games />} />
            <Route path="/dashboard/skills" element={<LifeSkills />} />
            <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
            <Route path="/dashboard/tutor" element={<AITutor />} />
            
            {/* Parent Routes */}
            <Route path="/parent" element={<ParentDashboard />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
