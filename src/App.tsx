// src/App.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import Dashboard from "./components/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import Callback from "./services/Callback";
import { AuthProvider } from "./lib/auth-context"; // ✅ Add this
import AuthenticationService from "./services/AuthenticationService";
import Auth from "./services/Auth";

function Root() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  if (params.get("code")) {
    console.log("Root route detected OAuth callback:", location.search);
    return <Callback />;
  }
  return <Index />;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider> {/* ✅ Wrap all routes */}
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashBoard"
              element={
                <Dashboard
                  userRole={"admin"}
                  onLogout={() => {
                    AuthenticationService.logout();
                  }}
                />
              }
            />
            <Route path="/demo" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
