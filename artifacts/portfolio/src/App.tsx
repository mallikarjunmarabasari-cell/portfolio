import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Education from "@/pages/Education";
import Contact from "@/pages/Contact";
import SideDock from "@/components/SideDock";
import BottomDock from "@/components/BottomDock";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/education" component={Education} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function Layout() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SideDock />
      <main className="md:pl-20">
        <AnimatedRoutes />
      </main>
      <BottomDock />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Layout />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
