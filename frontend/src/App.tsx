import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <AnimatePresence mode="wait">
      {isSplash ? (
        <Splash key="splash" />
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen"
          style={{ backgroundColor: "#050805" }}
        >
          <TopNav />
          <VerticalStrip />
          {/* pt-[72px] pushes content below the fixed TopNav */}
          <main className="lg:pr-9 pt-[72px]">
            <PortfolioRoutes />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
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
