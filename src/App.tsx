
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
import { NetworkStatus } from "./components/NetworkStatus";
import {
  LazyIndex,
  LazySignIn,
  LazyResetPassword,
  LazySetNewPassword,
  LazyOTPVerification,
  LazyCompanyEvents,
  LazyPostDetail,
  LazyCreatePost,
  LazyPostManagement,
  LazyMemberManagement,
  LazyKnowledgeBase,
  LazyCreateKnowledgeBase,
  LazyCreateEvent,
  LazyDepartmentDocuments,
  LazyDocumentView,
  LazySuggestionBox,
  LazyManageDepartments,
  LazyDepartmentsManagement,
} from "./components/LazyRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <NetworkStatus />
        <BrowserRouter>
          <AuthProvider>
            <CategoryProvider>
              <Routes>
                <Route path="/" element={<LazyIndex />} />
                <Route path="/sign-in" element={<LazySignIn />} />
                <Route path="/reset-password" element={<LazyResetPassword />} />
                <Route path="/set-new-password" element={<LazySetNewPassword />} />
                <Route path="/otp-verification" element={<LazyOTPVerification />} />
                
                <Route path="/company-events" element={
                  <ErrorBoundary>
                    <Layout>
                      <LazyCompanyEvents />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/post/:id" element={
                  <ErrorBoundary>
                    <Layout>
                      <LazyPostDetail />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/create-post" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyCreatePost />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/post-management" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyPostManagement />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/member-management" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyMemberManagement />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/members" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyMemberManagement />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/knowledge-base" element={
                  <ErrorBoundary>
                    <Layout>
                      <LazyKnowledgeBase />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/knowledge-base/:department" element={
                  <ErrorBoundary>
                    <Layout>
                      <LazyDepartmentDocuments />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/knowledge-base/:department/document/:id" element={
                  <ErrorBoundary>
                    <Layout>
                      <LazyDocumentView />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/create-knowledge-base" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyCreateKnowledgeBase />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/create-event" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyCreateEvent />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/suggestion-box" element={
                  <ErrorBoundary>
                    <Layout>
                      <LazySuggestionBox />
                    </Layout>
                  </ErrorBoundary>
                } />
                
                <Route path="/departments-management" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyDepartmentsManagement />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/manage-departments/:department" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyManageDepartments />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                
                <Route path="/post-management/edit/:id" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyCreatePost />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/knowledge-base/edit/:id" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyCreateKnowledgeBase />
                      </Layout>
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/events/edit/:id" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Layout>
                        <LazyCreateEvent />
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
