
import { BrowserRouter , Routes , Route  } from 'react-router-dom';
import Home from './Page/Home';
import ArticleDetail from './Page/ArticleDetail';

function App() {


  return (
    <>
      <BrowserRouter><Routes>
        <Route path='/' element = {<Home /> } />
        <Route path='/article/:id' element={<ArticleDetail />} />
      </Routes>
      </BrowserRouter>

      
    </>
  );
}

export default App;