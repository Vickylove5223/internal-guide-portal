import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignIn from './pages/SignIn';
import ResetPassword from './pages/ResetPassword';
import SetNewPassword from './pages/SetNewPassword';
import OTPVerification from './pages/OTPVerification';
import Overview from './pages/Overview';
import Announcements from './pages/Announcements';
import PostManagement from './pages/PostManagement';
import CreatePost from './pages/CreatePost';
import MediaLibrary from './pages/MediaLibrary';
import OnboardingDocs from './pages/OnboardingDocs';
import KnowledgeBase from './pages/KnowledgeBase';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import DepartmentDocuments from './pages/DepartmentDocuments';
import MemberManagement from './pages/MemberManagement';
import DocumentView from './pages/DocumentView';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/post-management" element={<PostManagement />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/media-library" element={<MediaLibrary />} />
                    <Route path="/onboarding" element={<OnboardingDocs />} />
                    <Route path="/knowledge-base" element={<KnowledgeBase />} />
                    <Route path="/knowledge-base/:department" element={<DepartmentDocuments />} />
                    <Route path="/knowledge-base/:department/:documentId" element={<DocumentView />} />
                    <Route path="/members" element={<MemberManagement />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
