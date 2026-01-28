
import { BrowserRouter , Routes , Route  } from 'react-router-dom';
import Home from './Page/Home';
import ArticleDetail from './Page/ArticleDetail';
import NotFound from './Page/NotFound';

function App() {


  return (
    <>
      <BrowserRouter><Routes>
        <Route path='/' element = {<Home /> } />
        <Route path='/post/:postId' element={<ArticleDetail />} />
        {/* หน้า 404: รองรับ URL ที่ไม่มีในระบบ */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>

      
    </>
  );
}

export default App;