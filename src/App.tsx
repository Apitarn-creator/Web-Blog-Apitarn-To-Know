import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import ArticleDetail from './Page/ArticleDetail';
import NotFound from './Page/NotFound';
import Login from './Page/Login';
import SignUp from './Page/SignUp';
import AdminDashboard from './Page/AdminDashboard';
import UserProfile from './Page/UserProfile';
import HealthTestPage from "./Page/HealthTestPage";
import CreatePostPage from './Page/CreatePostPage';
import CategoryManagementPage from './Page/CategoryManagementPage';
import NotificationPage from './Page/NotificationPage'; 
import AdminLayout from './Components/AdminLayout';
import ResetPasswordPage from './Page/ResetPasswordPage';
import DebugPage from './Page/DebugPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/post/:postId' element={<ArticleDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Admin Routes (ใช้ Layout เดียวกัน มี Sidebar ติดมาด้วย) */}
          <Route element={<AdminLayout />}>
             <Route path="/create-post" element={<CreatePostPage />} />
             <Route path="/category-management" element={<CategoryManagementPage />} />
             <Route path="/user-profile" element={<UserProfile />} />
             <Route path="/notification" element={<NotificationPage />} />
             <Route path="/reset-password" element={<ResetPasswordPage />} />
             <Route path="/debug" element={<DebugPage />} />
             <Route path='/admin' element={<AdminDashboard />} />
          </Route>

          {/* Utility Routes */}
          <Route path="/test-health" element={<HealthTestPage />} />
          
          {/* 404 Route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;