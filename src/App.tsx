import React, { useState } from 'react';
import internal from 'stream';
import './App.css';
import Arena from './components/arena';
import Settings from './components/settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CharBuild, LuxumNewman, LuxumNewman2 } from './model/char';
import { GameSettings } from './model/game';


const App = () => {

  var startCharSet: [number, CharBuild][] = []
  startCharSet.push([0, LuxumNewman])
  startCharSet.push([1, LuxumNewman2])

  const baseSettings: GameSettings = {
    characterSet: startCharSet,
    numPlayers: 1,
    numEnemies: 1,
    enemyType: "goblin",
    battlefield: "desert",
  }

  const [mode, setMode] = useState('settings')
  const [gameSettings, setGameSettings] = useState<GameSettings>(baseSettings)

  return (
    <div className="pages">

      {mode === 'settings' && (
        <Settings
          settings={gameSettings}
          onStartClick={() => setMode('arena')}
        />
      )}

      {mode === 'arena' && (
        <Arena
          settings={gameSettings}
        />
      )}

    </div>
  );
}


export default App;
