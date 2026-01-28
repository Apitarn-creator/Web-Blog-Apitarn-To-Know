
import { BrowserRouter , Routes , Route  } from 'react-router-dom';
import Home from './Page/Home';
import ArticleDetail from './Page/ArticleDetail';
import NotFound from './Page/NotFound';
import Login from './Page/Login';
import SignUp from './Page/SignUp';
import AdminDashboard from './Page/AdminDashboard';


function App() {


  return (
    <>
      <BrowserRouter><Routes>
        <Route path='/' element = {<Home /> } />
        <Route path='/post/:postId' element={<ArticleDetail />} />
        {/* หน้า 404: รองรับ URL ที่ไม่มีในระบบ */}
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} /> 
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
      </BrowserRouter>

      
    </>
  );
}

export default App;