
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
import CompanyNews from "./pages/CompanyNews";
import OnboardingDocs from "./pages/OnboardingDocs";
import KnowledgeBase from "./pages/KnowledgeBase";
import MemberManagement from "./pages/MemberManagement";
import PostManagement from "./pages/PostManagement";
import CreatePost from "./pages/CreatePost";
import DepartmentDocuments from "./pages/DepartmentDocuments";
import DocumentView from "./pages/DocumentView";

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
                <Layout>
                  <CompanyNews />
                </Layout>
              } />
              <Route path="/onboarding" element={
                <Layout>
                  <OnboardingDocs />
                </Layout>
              } />
              <Route path="/knowledge-base" element={
                <Layout>
                  <KnowledgeBase />
                </Layout>
              } />
              <Route path="/knowledge-base/:department" element={
                <Layout>
                  <DepartmentDocuments />
                </Layout>
              } />
              <Route path="/knowledge-base/:department/document/:documentId" element={
                <Layout>
                  <DocumentView />
                </Layout>
              } />
              <Route path="/post-management" element={
                <ProtectedRoute>
                  <Layout>
                    <PostManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/post-management/new" element={
                <ProtectedRoute>
                  <Layout>
                    <CreatePost />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BaseLayout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
