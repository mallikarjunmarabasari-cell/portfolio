import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import Splash from "@/pages/Splash";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Education from "@/pages/Education";
import Contact from "@/pages/Contact";
import TopNav from "@/components/TopNav";
import VerticalStrip from "@/components/VerticalStrip";

const queryClient = new QueryClient();

function PortfolioRoutes() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/home" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/education" component={Education} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isSplash = location === "/";

  if (isSplash) {
    return (
      <AnimatePresence mode="wait">
        <Splash key="splash" />
      </AnimatePresence>
    );
  }

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "#050805" }}>
      <TopNav />
      <VerticalStrip />
      <main className="lg:pr-9">
        <PortfolioRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppContent />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
