import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { HomePage } from '../pages/public/HomePage';
import { ArticleDetailPage } from '../pages/public/ArticleDetailPage';
import { CategoryPage } from '../pages/public/CategoryPage';
import { SearchPage } from '../pages/public/SearchPage';
import { AboutPage } from '../pages/public/AboutPage';
import { ContactPage } from '../pages/public/ContactPage';
import { PrivacyPolicyPage } from '../pages/public/PrivacyPolicyPage';
import { TermsPage } from '../pages/public/TermsPage';
import { DisclaimerPage } from '../pages/public/DisclaimerPage';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminArticlesPage } from '../pages/admin/AdminArticlesPage';
import { ArticleEditorPage } from '../pages/admin/ArticleEditorPage';
import { AdminMediaPage } from '../pages/admin/AdminMediaPage';
import { AdminAdsPage } from '../pages/admin/AdminAdsPage';
import { AdminFeedSyncPage } from '../pages/admin/AdminFeedSyncPage';
import { AdminBroadcastPage } from '../pages/admin/AdminBroadcastPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  // Public Reader Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'news/:slug', element: <ArticleDetailPage /> },
      { path: 'articles/:slug', element: <ArticleDetailPage /> },
      { path: 'category/:slug', element: <CategoryPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'disclaimer', element: <DisclaimerPage /> },
    ],
  },
  // Public Admin Login Route
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  // Protected Admin CMS Routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'categories', element: <AdminCategoriesPage /> },
      { path: 'articles', element: <AdminArticlesPage /> },
      { path: 'articles/new', element: <ArticleEditorPage /> },
      { path: 'articles/:id/edit', element: <ArticleEditorPage /> },
      { path: 'broadcast', element: <AdminBroadcastPage /> },
      { path: 'media', element: <AdminMediaPage /> },
      { path: 'ads', element: <AdminAdsPage /> },
      { path: 'feeds', element: <AdminFeedSyncPage /> },
    ],
  },
  // Fallback 404 Route
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

