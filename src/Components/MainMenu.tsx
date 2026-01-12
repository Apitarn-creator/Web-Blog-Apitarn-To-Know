
import React from 'react';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenDeck: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onOpenDeck }) => {
  return (
    <div className="main-menu-container" style={styles.overlay}>
      <h1 style={styles.title}>Sinful Miner</h1>
      <p style={styles.subtitle}>See your treasure</p>
      
      <div style={styles.buttonGroup}>
        <button onClick={onStartGame} style={styles.primaryBtn}>
          ลงสู่สนาม (Start Game)
        </button>
        <button onClick={onOpenDeck} style={styles.secondaryBtn}>
          จัดการสำรับการ์ด (Deck)
        </button>
        <button style={styles.secondaryBtn}>
          คลังตัวละคร (Characters)
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/bg-battle.png")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white'
  },
  title: { fontSize: '4rem', textShadow: '2px 2px #000', marginBottom: '0' },
  subtitle: { fontSize: '1.2rem', marginBottom: '2rem' },
  buttonGroup: { display: 'flex', flexDirection: 'column' as 'column', gap: '15px' },
  primaryBtn: { padding: '15px 40px', fontSize: '1.5rem', cursor: 'pointer', backgroundColor: '#e67e22', border: 'none', color: 'white', borderRadius: '8px' },
  secondaryBtn: { padding: '10px 30px', fontSize: '1.1rem', cursor: 'pointer', backgroundColor: '#34495e', border: 'none', color: 'white', borderRadius: '8px' },
};

export default MainMenu;