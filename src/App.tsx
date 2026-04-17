import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import ArticleDetail from './Page/ArticleDetail';
import NotFound from './Page/NotFound';
import Login from './Page/Login';
import SignUp from './Page/SignUp';
import AdminDashboard from './Page/AdminDashboard';
import UserProfile from './Page/UserProfile';
import HealthTestPage from './Page/HealthTestPage';
import CreatePostPage from './Page/CreatePostPage';
import CategoryManagementPage from './Page/CategoryManagementPage';
import NotificationPage from './Page/NotificationPage';
import AdminLayout from './Components/AdminLayout';
import ResetPasswordPage from './Page/ResetPasswordPage';
import DebugPage from './Page/DebugPage';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test-health" element={<HealthTestPage />} />

        {/* Protected: ต้อง login + เป็น admin เท่านั้น */}
        <Route element={<ProtectedRoute requireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/category-management" element={<CategoryManagementPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/debug" element={<DebugPage />} />
          </Route>
        </Route>

        {/* Protected: ต้อง login (ไม่ต้องเป็น admin) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
