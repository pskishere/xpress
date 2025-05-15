
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
import NewsDetail from "./pages/NewsDetail";
import KeepAlive from "./components/KeepAlive";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  <KeepAlive>
                    <Index />
                  </KeepAlive>
                } />
                <Route path="/news/:id" element={
                  <KeepAlive>
                    <NewsDetail />
                  </KeepAlive>
                } />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </I18nextProvider>
  );
};

export default App;
