import { useState } from 'react';
import MainMenu from './Components/MainMenu';
import Game from './Components/Game';
import { BrowserRouter , Routes , Route  } from 'react-router-dom';
import Home from './Page/Home';
import ArticleDetail from './Page/ArticleDetail';

function App() {
  
  const [gameState, setGameState] = useState<'MENU' | 'BATTLE'>('MENU');

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