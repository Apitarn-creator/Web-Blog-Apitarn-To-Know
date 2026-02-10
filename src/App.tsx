import { BrowserRouter , Routes , Route  } from 'react-router-dom';
import Home from './Page/Home';
import ArticleDetail from './Page/ArticleDetail';
import NotFound from './Page/NotFound';
import Login from './Page/Login';
import SignUp from './Page/SignUp';
import AdminDashboard from './Page/AdminDashboard';
import UserProfile from './Page/UserProfile';
import HealthTestPage from './Page/HealthTestPage';
import CreatePostPage from './Page/CreatePostPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home /> } />
          <Route path='/post/:postId' element={<ArticleDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} /> 
          <Route path='/admin' element={<AdminDashboard />} />
          
          {/* 2. เพิ่ม Route สำหรับ Member Management (Profile) */}
          <Route path='/profile' element={<UserProfile />} /> 

          {/* หน้า 404 ไว้ล่างสุดเสมอ */}
          <Route path='*' element={<NotFound />} />
          <Route path='/test-health' element={<HealthTestPage />} />
          
          <Route path='*' element={<NotFound />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;