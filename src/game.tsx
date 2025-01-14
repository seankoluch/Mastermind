import './App.css';
import React from 'react';
import './grid.css';
import { Column } from './column';
import AnswerColumnHidden from './answercolumnhidden';
import AnswerColumnRevealed from './answercolumnrevealed';
import { Link } from 'react-router-dom';

interface GameProps {
  gameDifficulty: string
}

interface GameState {
  activeColumns: number;
  hasWon: boolean;
  hasLost: boolean;
  finalCode: string[];
  numGuesses: number;
  gameStreak: number;
  isSubmittingScore: boolean; // New state
}

class Game extends React.Component<GameProps, GameState> {

  constructor(props: GameProps) {
    super(props);
    this.state = {
      isSubmittingScore: false,
      gameStreak: 0,
      activeColumns: 1,
      hasWon: false,
      hasLost: false,
      finalCode: this.createFinalCode(this.props.gameDifficulty),
      numGuesses: this.props.gameDifficulty === 'Insane'? 6:this.props.gameDifficulty === 'Hard'? 6:(this.props.gameDifficulty === 'Normal')? 7: 8
    };
  }

  createFinalCode = (gameDifficulty: string) => {
    const shuffleArray = (array: string[]): string[] => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
      }
      return array;
    };

    if (gameDifficulty === 'Easy') {
      const colorPalette = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];
      return shuffleArray(colorPalette).slice(0, 4);
    } else if (gameDifficulty === 'Normal') {
      const colorPalette = ['red', 'red', 'lime', 'lime', 'white', 'white',
      'dodgerblue', 'dodgerblue', 'fuchsia', 'fuchsia', 'yellow', 'yellow'];
      return shuffleArray(colorPalette).slice(0, 4);
    } else if (gameDifficulty === 'Hard') {
      const colorPalette = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];
      const array: string[] = [];
      for (let i = 0; i < 4; i++) {
        array.push(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
      } 
      return array;
    } else {
      const colorPalette = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];
      const array: string[] = [];
      for (let i = 0; i < 5; i++) {
        array.push(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
      }
      return array;
    }
  }

  onSubmit = (columnCode: string[]) => {
    if (!columnCode.includes('grey')) {
      if (columnCode.join() === this.state.finalCode.join()) {
        this.setState({ activeColumns: this.state.activeColumns + 1})
        this.setState({hasWon: true});
      } else {
        this.setState({ activeColumns: this.state.activeColumns + 1})
      }
      if (this.state.activeColumns === this.state.numGuesses) {
        this.setState({hasLost: true});
      };
    }
  };

  columnsRefs: (Column | null)[] = [];
  columns:any[] = [];

  renderColumns = () => {
    this.columns=[];

    for (let i = 0; i < this.state.numGuesses; i++) {
      this.columns.push(
        <Column
          numButtons={this.props.gameDifficulty === 'Insane'?5:4}
          activeColumns={this.state.activeColumns}
          index={i}
          onSubmit={this.onSubmit}
          answer={this.state.finalCode}
          isGameOver={this.state.hasWon || this.state.hasLost}
          key={i}
          ref={(ref) => (this.columnsRefs[i] = ref)}
        />
      );
    }

    return this.columns;
  }

  resetColumnCodes = () => {
    this.columnsRefs.forEach((columnRef) => {
      if (columnRef) {
        columnRef.resetColumn();
      }
    });
  }

  resetGame = async (streakAdd: boolean) => {
    const qualifiesForLeaderboard = streakAdd && await this.checkIfTopScore(this.state.gameStreak + 1);
  
    this.setState({
      gameStreak: streakAdd ? this.state.gameStreak + 1 : 0,
      activeColumns: 1,
      hasWon: false,
      hasLost: false,
      isSubmittingScore: qualifiesForLeaderboard, // Enable submission if qualified
      finalCode: this.createFinalCode(this.props.gameDifficulty),
      numGuesses: this.props.gameDifficulty === 'Insane' ? 6 : this.props.gameDifficulty === 'Hard' ? 6 : (this.props.gameDifficulty === 'Normal') ? 7 : 8
    });
  
    this.resetColumnCodes();
  }

  checkIfTopScore = async (score: number) => {
    const gameKey = '8282e84b30a26cb68dad6c0a88ab78367943f01e';
    const url = `https://purpletoken.com/update/v2/get_score?gamekey=${gameKey}&format=json&limit=5`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.scores && data.scores.length > 0) {
        const scores = data.scores.map((entry: any) => entry.score);
        return scores.length < 5 || score > Math.min(...scores);
      }
      return true; // If no scores exist, any score qualifies.
    } catch (error) {
      console.error('Error fetching leaderboard scores:', error);
      return false; // Default to not qualifying if there's an error.
    }
  };

  submitToLeaderboard = (name: string) => {
    const gameKey = '8282e84b30a26cb68dad6c0a88ab78367943f01e';
    const { gameStreak } = this.state;
  
    const formData = new URLSearchParams();
    formData.append('gamekey', gameKey);
    formData.append('player', name);
    formData.append('score', gameStreak.toString());
  
    fetch('https://purpletoken.com/update/v2/submit_score', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Your score has been submitted!');
          this.setState({ isSubmittingScore: false }); // Close the submission form
        } else {
          alert('Failed to submit score.');
        }
      })
      .catch((error) => {
        console.error('Error submitting score:', error);
      });
  }

  renderLeaderboardSubmission() {
    return (
      <div className="leaderboard-submission">
        <h2>Congratulations! You're on the leaderboard!</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const playerName = (e.target as any).player.value.toUpperCase().slice(0, 3); // Ensure uppercase and limit to 3 chars
            this.submitToLeaderboard(playerName);
          }}
        >
          <input type="text" name="player" placeholder="Enter your name (3 letters)" maxLength={3} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="Game">
        <Link to="/"><div className="titlescreen-return">Title Screen</div></Link>
        <div className="difficulty-display">{this.props.gameDifficulty} Difficulty</div>
        <div className="streak-display">Streak: {this.state.gameStreak}</div>
        <div className="restart" onClick={() => { this.resetGame(this.state.hasWon); }}>Restart</div>
        <div className="guess-list">
          {this.renderColumns()}
          {(this.state.hasWon || this.state.hasLost) ? (
            <>
              <header className={`you-${this.state.hasWon ? 'win' : 'lose'}`}>
                {this.state.hasWon ? 'YOU WIN!' : 'YOU LOSE!'}
              </header>
              <AnswerColumnRevealed finalCode={this.state.finalCode} />
              <div className="play-again" onClick={() => { this.resetGame(this.state.hasWon); }}>Play Again</div>
            </>
          ) : (
            <AnswerColumnHidden finalCode={this.state.finalCode} />
          )}
        </div>
        {this.state.isSubmittingScore && this.renderLeaderboardSubmission()}
      </div>
    );
  }
}

export default Game;