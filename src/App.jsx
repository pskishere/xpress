
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import initDatabase from "./utils/initDatabase";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize database when app starts
    initDatabase()
      .then(result => {
        if (result.success) {
          console.log('Database initialization completed successfully');
        } else {
          console.error('Database initialization failed:', result.error);
        }
      })
      .catch(error => {
        console.error('Unexpected error during database initialization:', error);
      });
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </I18nextProvider>
  );
};

export default App;
