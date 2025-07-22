
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CategoryProvider } from './contexts/CategoryContext';
import ErrorBoundary from "./components/ErrorBoundary";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
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
                  <ErrorBoundary>
                    <Layout>
                      <CompanyEvents />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/post/:id" element={
                  <ErrorBoundary>
                    <Layout>
                      <PostDetail />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/create-post" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <CreatePost />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/post-management" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <PostManagement />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/member-management" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <MemberManagement />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/members" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <MemberManagement />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/knowledge-base" element={
                  <ErrorBoundary>
                    <Layout>
                      <KnowledgeBase />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/knowledge-base/:department" element={
                  <ErrorBoundary>
                    <Layout>
                      <DepartmentDocuments />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/knowledge-base/:department/document/:id" element={
                  <ErrorBoundary>
                    <Layout>
                      <DocumentView />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/create-knowledge-base" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <CreateKnowledgeBase />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/create-event" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <CreateEvent />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/suggestion-box" element={
                  <ErrorBoundary>
                    <Layout>
                      <SuggestionBox />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/departments-management" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <DepartmentsManagement />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/manage-departments/:department" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <ManageDepartments />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/post-management/edit/:id" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <CreatePost />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/knowledge-base/edit/:id" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <CreateKnowledgeBase />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/events/edit/:id" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <CreateEvent />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
              </Routes>
            </CategoryProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
