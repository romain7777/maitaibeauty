import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Localisation from "@/pages/localisation";
import Galerie from "@/pages/galerie";
import Personnel from "@/pages/personnel";
import Admin from "@/pages/admin";
import PageTransition from "@/components/ui/page-transition";
import FloatingSocialBubble from "@/components/ui/floating-social-bubble";
import ScrollToTop from "@/components/utils/ScrollToTop";

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location}>
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/galerie" component={Galerie} />
          <Route path="/personnel" component={Personnel} />
          <Route path="/localisation" component={Localisation} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Router />
        <FloatingSocialBubble />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
