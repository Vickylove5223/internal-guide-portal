
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import BaseLayout from "./components/BaseLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import OTPVerification from "./pages/OTPVerification";
import SetNewPassword from "./pages/SetNewPassword";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/Announcements";
import CompanyNews from "./pages/CompanyNews";
import OnboardingDocs from "./pages/OnboardingDocs";
import KnowledgeBase from "./pages/KnowledgeBase";
import MemberManagement from "./pages/MemberManagement";
import MediaLibrary from "./pages/MediaLibrary";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <BaseLayout>
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/otp-verification" element={<OTPVerification />} />
              <Route path="/set-new-password" element={<SetNewPassword />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/announcements" element={
                <ProtectedRoute>
                  <Layout>
                    <Announcements />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/company-news" element={
                <ProtectedRoute>
                  <Layout>
                    <CompanyNews />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <Layout>
                    <OnboardingDocs />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/knowledge-base" element={
                <ProtectedRoute>
                  <Layout>
                    <KnowledgeBase />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/members" element={
                <ProtectedRoute>
                  <Layout>
                    <MemberManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/media" element={
                <ProtectedRoute>
                  <Layout>
                    <MediaLibrary />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BaseLayout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
