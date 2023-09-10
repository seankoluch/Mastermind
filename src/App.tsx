import './App.css';
import TitleScreen from './titlescreen.tsx';
import Tutorial from './tutorial.tsx';
import Game from './game.tsx';
import Settings from './settings.tsx';
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, /*Switch*/ } from 'react-router-dom';

function App() {
  const numButtons: number = 4;
  const colorSet: string[] = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];
  const finalCode: string[] = [];
  const [gameDifficulty, setGameDifficulty] = useState<string>('Easy');

  const onSubmit = (difficulty: string) => {
    setGameDifficulty(difficulty);
    localStorage.setItem('gameDifficulty', difficulty); 
  }

  useEffect(() => {
    const storedDifficulty = localStorage.getItem('gameDifficulty');
    if (storedDifficulty) {
      setGameDifficulty(storedDifficulty);
    }
  }, []);

  const numGuesses: number = gameDifficulty === 'Hard'? 6:(gameDifficulty === 'Normal')? 7: 8;

  if (gameDifficulty === 'Easy') {
    let map = new Map<string, number>();
    for (let i = 0; i < numButtons; i++) {
      let randomIndex = Math.floor(Math.random() * colorSet.length);
      if (map.get(colorSet[randomIndex]) === undefined) {
        map.set(colorSet[randomIndex], 1);
        finalCode.push(colorSet[randomIndex]);
      } else {
        i--;
      }
    }
  } else if (gameDifficulty === 'Normal') {
    let map = new Map<string, number>();
    for (let i = 0; i < numButtons; i++) {
      let randomIndex = Math.floor(Math.random() * colorSet.length);
      if (map.get(colorSet[randomIndex]) === undefined) {
        map.set(colorSet[randomIndex], 1);
        finalCode.push(colorSet[randomIndex]);
      } else if (map.get(colorSet[randomIndex]) === 1) {
        map.set(colorSet[randomIndex], 2);
        finalCode.push(colorSet[randomIndex]);
      } else {
        i--;
      }
    }
  } else {
    for (let i = 0; i < numButtons; i++) {
      finalCode.push(colorSet[Math.floor(Math.random() * colorSet.length)]);
    }
  }
    
  return (
  <Router>
    <Routes>
      <Route path = "/" element={<TitleScreen />} />
      <Route path = "/HowToPlay" element={<Tutorial />} />
      <Route path = "/Game" element ={<Game finalCode={finalCode} numColumns={numGuesses}/>} />
      <Route path = "/Settings" element ={<Settings onSubmit={onSubmit} currentDifficulty={gameDifficulty} />} />
    </Routes>
  </Router>
  );
}

export default App;
