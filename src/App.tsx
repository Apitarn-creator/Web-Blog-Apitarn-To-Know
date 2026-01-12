import { useState } from 'react';
import Navbar from './Components/navbar';
import Body from './Components/Body';
import Footer from './Components/Footer';
import MainMenu from './Components/MainMenu';
import Game from './Components/Game';

function App() {
  // สร้าง State สำหรับสลับหน้าจอ
  const [gameState, setGameState] = useState<'MENU' | 'BATTLE'>('MENU');

  return (
    <>
      <Navbar />
      <Body />
      <Footer />

      <div className="App">
        {/* ใช้ Ternary Operator ในการเลือกแสดงหน้าจอ */}
        {gameState === 'MENU' ? (
          <MainMenu 
            onStartGame={() => setGameState('BATTLE')} 
            onOpenDeck={() => alert("เปิดหน้า Deck (เร็วๆ นี้)")} 
          />
        ) : (
          <div className="game-screen" style={{ position: 'relative' }}>
            <button 
              onClick={() => setGameState('MENU')} 
              style={{ position: 'absolute', zIndex: 10, top: 10, left: 10 }}
            >
              Back to Menu
            </button>
            <Game /> 
          </div>
        )}
      </div>
      
    </>
  );
}

export default App;