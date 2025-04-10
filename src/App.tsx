
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PropertyDetails from "./pages/PropertyDetails";
import UserDashboard from "./pages/UserDashboard";
import Resources from "./pages/Resources";
import Apply from "./pages/Apply";
import Properties from "./pages/Properties";
import NotFound from "./pages/NotFound";
import Applications from "./pages/Applications";
import DocumentChecklist from "./pages/DocumentChecklist";
import Community from "./pages/Community";
import HousingTimeline from "./pages/HousingTimeline";
import Neighborhood from "./pages/Neighborhood";
import News from "./pages/News";
import PreferenceQuiz from "./pages/PreferenceQuiz";
import MapExplorer from "./pages/MapExplorer";
import ScheduleViewing from "./pages/ScheduleViewing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/schedule-viewing/:id" element={<ScheduleViewing />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/documents" element={<DocumentChecklist />} />
          <Route path="/community" element={<Community />} />
          <Route path="/timeline" element={<HousingTimeline />} />
          <Route path="/neighborhoods" element={<Neighborhood />} />
          <Route path="/news" element={<News />} />
          <Route path="/quiz" element={<PreferenceQuiz />} />
          <Route path="/map-explorer" element={<MapExplorer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
