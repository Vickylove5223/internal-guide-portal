
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import SetNewPassword from "./pages/SetNewPassword";
import OTPVerification from "./pages/OTPVerification";
import CompanyEvents from "./pages/CompanyEvents";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import PostManagement from "./pages/PostManagement";
import MemberManagement from "./pages/MemberManagement";
import KnowledgeBase from "./pages/KnowledgeBase";
import CreateKnowledgeBase from "./pages/CreateKnowledgeBase";
import CreateEvent from "./pages/CreateEvent";
import DepartmentDocuments from "./pages/DepartmentDocuments";
import DocumentView from "./pages/DocumentView";
import SuggestionBox from "./pages/SuggestionBox";
import ManageDepartments from "./pages/ManageDepartments";
import DepartmentsManagement from "./pages/DepartmentsManagement";
import { CategoryProvider } from './contexts/CategoryContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CategoryProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/set-new-password" element={<SetNewPassword />} />
              <Route path="/otp-verification" element={<OTPVerification />} />
              
              <Route path="/company-events" element={
                <Layout>
                  <CompanyEvents />
                </Layout>
              } />
              
              <Route path="/post/:id" element={
                <Layout>
                  <PostDetail />
                </Layout>
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
              
              <Route path="/member-management" element={
                <ProtectedRoute>
                  <Layout>
                    <MemberManagement />
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
              
              <Route path="/knowledge-base/:department/document/:id" element={
                <Layout>
                  <DocumentView />
                </Layout>
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
              
              <Route path="/suggestion-box" element={
                <Layout>
                  <SuggestionBox />
                </Layout>
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
              
              <Route path="/post-management/edit/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <CreatePost />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/knowledge-base/edit/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <CreateKnowledgeBase />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/events/edit/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <CreateEvent />
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </CategoryProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
