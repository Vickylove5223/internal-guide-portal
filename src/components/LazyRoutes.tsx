
import React, { Suspense } from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';

// Lazy load all page components
const Index = React.lazy(() => import('../pages/Index'));
const SignIn = React.lazy(() => import('../pages/SignIn'));
const ResetPassword = React.lazy(() => import('../pages/ResetPassword'));
const SetNewPassword = React.lazy(() => import('../pages/SetNewPassword'));
const OTPVerification = React.lazy(() => import('../pages/OTPVerification'));
const CompanyEvents = React.lazy(() => import('../pages/CompanyEvents'));
const PostDetail = React.lazy(() => import('../pages/PostDetail'));
const CreatePost = React.lazy(() => import('../pages/CreatePost'));
const PostManagement = React.lazy(() => import('../pages/PostManagement'));
const MemberManagement = React.lazy(() => import('../pages/MemberManagement'));
const KnowledgeBase = React.lazy(() => import('../pages/KnowledgeBase'));
const CreateKnowledgeBase = React.lazy(() => import('../pages/CreateKnowledgeBase'));
const CreateEvent = React.lazy(() => import('../pages/CreateEvent'));
const DepartmentDocuments = React.lazy(() => import('../pages/DepartmentDocuments'));
const DocumentView = React.lazy(() => import('../pages/DocumentView'));
const SuggestionBox = React.lazy(() => import('../pages/SuggestionBox'));
const ManageDepartments = React.lazy(() => import('../pages/ManageDepartments'));
const DepartmentsManagement = React.lazy(() => import('../pages/DepartmentsManagement'));

// Loading fallback component
const PageLoader = () => (
  <div className="p-6 max-w-7xl mx-auto">
    <LoadingSkeleton type="card" count={2} />
  </div>
);

// Higher-order component to wrap pages with Suspense
export const withSuspense = (Component: React.ComponentType) => {
  return function SuspenseWrapper(props: any) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

// Export all lazy components
export const LazyIndex = withSuspense(Index);
export const LazySignIn = withSuspense(SignIn);
export const LazyResetPassword = withSuspense(ResetPassword);
export const LazySetNewPassword = withSuspense(SetNewPassword);
export const LazyOTPVerification = withSuspense(OTPVerification);
export const LazyCompanyEvents = withSuspense(CompanyEvents);
export const LazyPostDetail = withSuspense(PostDetail);
export const LazyCreatePost = withSuspense(CreatePost);
export const LazyPostManagement = withSuspense(PostManagement);
export const LazyMemberManagement = withSuspense(MemberManagement);
export const LazyKnowledgeBase = withSuspense(KnowledgeBase);
export const LazyCreateKnowledgeBase = withSuspense(CreateKnowledgeBase);
export const LazyCreateEvent = withSuspense(CreateEvent);
export const LazyDepartmentDocuments = withSuspense(DepartmentDocuments);
export const LazyDocumentView = withSuspense(DocumentView);
export const LazySuggestionBox = withSuspense(SuggestionBox);
export const LazyManageDepartments = withSuspense(ManageDepartments);
export const LazyDepartmentsManagement = withSuspense(DepartmentsManagement);
