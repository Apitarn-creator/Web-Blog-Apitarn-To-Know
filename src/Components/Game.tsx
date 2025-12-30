import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game = () => {
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (gameRef.current) return; // ป้องกันการสร้างเกมซ้ำ

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: 'phaser-game-container',
            width: 600,
            height: 400,
            backgroundColor: '#2dcb71', // สีเขียวเหมือนสนามหญ้า
            scene: {
                create: function(this: Phaser.Scene) {
                    this.add.text(20, 20, "Hog Farm Loading...", { color: '#ffffff' });
                }
            }
        };

        gameRef.current = new Phaser.Game(config);

        return () => {
            gameRef.current?.destroy(true);
            gameRef.current = null;
        };
    }, []);

    return <div id="phaser-game-container" />;
};

export default Game;