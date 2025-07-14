
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import BaseLayout from "./components/BaseLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import SmartcashHeader from "./components/SmartcashHeader";
import Overview from "./pages/Overview";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import OTPVerification from "./pages/OTPVerification";
import SetNewPassword from "./pages/SetNewPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <BaseLayout>
            <SmartcashHeader>
              <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/otp-verification" element={<OTPVerification />} />
                <Route path="/set-new-password" element={<SetNewPassword />} />
                <Route path="/" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
                <Route path="/overview" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SmartcashHeader>
          </BaseLayout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
