
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
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
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Routes - Protected */}
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="properties" element={<AdminProperties />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
