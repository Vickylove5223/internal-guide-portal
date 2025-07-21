
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import SetNewPassword from "./pages/SetNewPassword";
import OTPVerification from "./pages/OTPVerification";
import Overview from "./pages/Overview";
import Announcements from "./pages/Announcements";
import CompanyNews from "./pages/CompanyNews";
import BusinessNews from "./pages/BusinessNews";
import PoliticalNews from "./pages/PoliticalNews";
import HRUpdates from "./pages/HRUpdates";
import CompanyEvents from "./pages/CompanyEvents";
import Compliances from "./pages/Compliances";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import PostManagement from "./pages/PostManagement";
import MediaLibrary from "./pages/MediaLibrary";
import MemberManagement from "./pages/MemberManagement";
import KnowledgeBase from "./pages/KnowledgeBase";
import CreateKnowledgeBase from "./pages/CreateKnowledgeBase";
import CreateEvent from "./pages/CreateEvent";
import Settings from "./pages/Settings";
import OnboardingDocs from "./pages/OnboardingDocs";
import DepartmentDocuments from "./pages/DepartmentDocuments";
import DocumentView from "./pages/DocumentView";
import SuggestionBox from "./pages/SuggestionBox";
import ManageDepartments from "./pages/ManageDepartments";
import DepartmentsManagement from "./pages/DepartmentsManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/overview" element={
              <ProtectedRoute>
                <Layout>
                  <Overview />
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
            
            <Route path="/business-news" element={
              <ProtectedRoute>
                <Layout>
                  <BusinessNews />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/political-news" element={
              <ProtectedRoute>
                <Layout>
                  <PoliticalNews />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/hr-updates" element={
              <ProtectedRoute>
                <Layout>
                  <HRUpdates />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/company-events" element={
              <ProtectedRoute>
                <Layout>
                  <CompanyEvents />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/compliances" element={
              <ProtectedRoute>
                <Layout>
                  <Compliances />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/post/:id" element={
              <ProtectedRoute>
                <Layout>
                  <PostDetail />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/create-post" element={
              <ProtectedRoute>
                <Layout>
                  <CreatePost />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/post-management" element={
              <ProtectedRoute>
                <Layout>
                  <PostManagement />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/media-library" element={
              <ProtectedRoute>
                <Layout>
                  <MediaLibrary />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/member-management" element={
              <ProtectedRoute>
                <Layout>
                  <MemberManagement />
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
            
            <Route path="/knowledge-base/:department" element={
              <ProtectedRoute>
                <Layout>
                  <DepartmentDocuments />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/knowledge-base/:department/document/:id" element={
              <ProtectedRoute>
                <Layout>
                  <DocumentView />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/create-knowledge-base" element={
              <ProtectedRoute>
                <Layout>
                  <CreateKnowledgeBase />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/create-event" element={
              <ProtectedRoute>
                <Layout>
                  <CreateEvent />
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
            
            <Route path="/onboarding-docs" element={
              <ProtectedRoute>
                <Layout>
                  <OnboardingDocs />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/suggestion-box" element={
              <ProtectedRoute>
                <Layout>
                  <SuggestionBox />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/departments-management" element={
              <ProtectedRoute>
                <Layout>
                  <DepartmentsManagement />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/manage-departments/:department" element={
              <ProtectedRoute>
                <Layout>
                  <ManageDepartments />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
