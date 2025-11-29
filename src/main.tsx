
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocationProvider } from "@/contexts/LocationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import App from "./App";
import "./i18n"; // Import i18n initialization
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <App />
          </TooltipProvider>
        </LocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
