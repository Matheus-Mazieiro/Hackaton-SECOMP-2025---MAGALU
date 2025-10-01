import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ranking from "./pages/Ranking";
import Respiracao from "./pages/Respiracao";
import Descanse from "./pages/descansar";
import Sala from "./pages/Sala";
import NotFound from "./pages/NotFound";
import { TimerProvider } from "./components/timerContext";
import { usePageVisibility } from "./hooks/usePageVisibility";
import NomeUsuario from "./pages/User";

const queryClient = new QueryClient();

// Componente wrapper para usar o hook
const AppContent = () => {
  // Apenas usando o hook aqui já vai fazer os prints
  usePageVisibility();

  return (
    <Routes>
      <Route path="/inicial" element={<Index />} />
      <Route path="/" element={<NomeUsuario />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/descansar" element={<Descanse />} />            
      <Route path="/respiracao" element={<Respiracao />} />
      <Route path="/sala/:id" element={<Sala />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TimerProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TimerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;