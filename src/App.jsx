import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { navItems } from "./nav-items";
import { useEffect } from "react";
import initDatabase from "./utils/initDatabase";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

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
                {navItems.map(({ to, page }) => (
                  <Route key={to} path={to} element={page} />
                ))}
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </I18nextProvider>
  );
};

export default App;
