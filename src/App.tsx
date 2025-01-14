import './App.css';
import TitleScreen from './titlescreen.tsx';
import Tutorial from './tutorial.tsx';
import Game from './game.tsx';
import Settings from './settings.tsx';
import Leaderboard from './leaderboard.tsx';
import React from 'react';
import { HashRouter, Route, Routes, /*Switch*/ } from 'react-router-dom';

interface AppState {
  gameDifficulty: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      gameDifficulty: 'Easy'
    };
  }

  onSubmit = (difficulty: string) => {
    this.setState( {gameDifficulty: difficulty} );
  }

  render() {
    return (
      <HashRouter>
        <Routes>
          <Route path = "/" element={<TitleScreen />} />
          <Route path = "/HowToPlay" element={<Tutorial />} />
          <Route path = "/Game" element ={<Game gameDifficulty={this.state.gameDifficulty}/>} />
          <Route path = "/Settings" element ={<Settings onSubmit={this.onSubmit} currentDifficulty={this.state.gameDifficulty} />} />
          <Route path = "/Leaderboard" element={<Leaderboard />} />
        </Routes>
      </HashRouter>
    );
  }
}

export default App;
