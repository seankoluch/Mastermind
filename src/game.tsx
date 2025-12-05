import './App.css';
import React from 'react';
import './grid.css';
import { Column } from './column';
import AnswerColumnHidden from './answercolumnhidden';
import AnswerColumnRevealed from './answercolumnrevealed';
import { Link } from 'react-router-dom';

interface GameProps {
  gameDifficulty: string;
}

interface GameState {
  activeColumns: number;
  hasWon: boolean;
  hasLost: boolean;
  finalCode: string[];
  numGuesses: number;
  gameStreak: number;
  bestNextGuess: string[];
  hintLimit: number;
}

class Game extends React.Component<GameProps, GameState> {

  constructor(props: GameProps) {
    super(props);
    this.state = {
      gameStreak: 0,
      activeColumns: 1,
      hasWon: false,
      hasLost: false,
      finalCode: this.createFinalCode(this.props.gameDifficulty),
      numGuesses:
        this.props.gameDifficulty === 'Insane' ? 6 :
        this.props.gameDifficulty === 'Hard' ? 6 :
        this.props.gameDifficulty === 'Normal' ? 7 : 8,
      bestNextGuess: ['red', 'red', 'yellow', 'yellow'],
      hintLimit: 
        this.props.gameDifficulty === 'Insane' ? 0 :
        this.props.gameDifficulty === 'Hard' ? 1 :
        this.props.gameDifficulty === 'Normal' ? 2 : 3,
    };
  }

  /** solver guess counter */
  solverGuessCount = 0;

  /** store history for the solver */
  previousGuesses: string[][] = [];
  previousFeedback: { hits: number; blows: number }[] = [];

  /** basic evaluation function for Mastermind */
  evaluateGuess(guess: string[], solution: string[]) {
    let hits = 0;
    let blows = 0;

    const guessCopy = [...guess];
    const solutionCopy = [...solution];

    // hits
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] === solutionCopy[i]) {
        hits++;
        guessCopy[i] = "_";
        solutionCopy[i] = "*";
      }
    }

    // blows
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] !== "_" && solutionCopy.includes(guessCopy[i])) {
        blows++;
        solutionCopy[solutionCopy.indexOf(guessCopy[i])] = "*";
      }
    }

    return { hits, blows };
  }

  /** generate all possible codes (6 colors, length 4) */
  generateAllPossibleCodes() {
    const colors = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];
    const results: string[][] = [];

    for (let a of colors)
      for (let b of colors)
        for (let c of colors)
          for (let d of colors)
            results.push([a, b, c, d]);

    return results;
  }

  /** filter possible solutions that match all historical feedback */
  filterByHistory(possible: string[][]) {
    return possible.filter(code => {
      return this.previousGuesses.every((g, idx) => {
        const fb = this.evaluateGuess(g, code);
        return fb.hits === this.previousFeedback[idx].hits &&
               fb.blows === this.previousFeedback[idx].blows;
      });
    });
  }

  computeNextGuess() {
  let possible = this.generateAllPossibleCodes();
  possible = this.filterByHistory(possible);

  if (this.props.gameDifficulty === 'Easy') {
    // Only allow one of each color
    possible = possible.filter(code => new Set(code).size === code.length);
  }
  // Normal: no filtering needed; can include duplicates if desired
  // Hard/Insane: no filtering

  // If no history, use standard opener
  if (this.previousGuesses.length === 0) {
    return ['red', 'lime', 'white', 'fuchsia'];
  }

  if (possible.length <= 2) return possible[0];

  // Simplified Knuth minimax
  let bestGuess = possible[0];
  let bestScore = Infinity;
  for (let guess of possible) {
    const scoreMap: Record<string, number> = {};
    for (let sol of possible) {
      const fb = this.evaluateGuess(guess, sol);
      const key = `${fb.hits}-${fb.blows}`;
      scoreMap[key] = (scoreMap[key] || 0) + 1;
    }
    const worstCase = Math.max(...Object.values(scoreMap));
    if (worstCase < bestScore) {
      bestScore = worstCase;
      bestGuess = guess;
    }
  }
  return bestGuess;
}



  /** MAIN GAME CODE */

  createFinalCode = (gameDifficulty: string) => {
    const shuffleArray = (array: string[]): string[] => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    if (gameDifficulty === 'Easy') {
      const palette = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];
      return shuffleArray(palette).slice(0, 4);
    } else if (gameDifficulty === 'Normal') {
      const palette = [
        'red','red','lime','lime','white','white',
        'dodgerblue','dodgerblue','fuchsia','fuchsia','yellow','yellow'
      ];
      return shuffleArray(palette).slice(0, 4);
    } else if (gameDifficulty === 'Hard') {
      const palette = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];
      return Array.from({ length: 4 }, () => palette[Math.floor(Math.random() * palette.length)]);
    } else {
      const palette = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];
      return Array.from({ length: 5 }, () => palette[Math.floor(Math.random() * palette.length)]);
    }
  };

  onSubmit = (columnCode: string[]) => {
    if (columnCode.includes('grey')) return;

    const result = this.evaluateGuess(columnCode, this.state.finalCode);

    this.previousGuesses.push(columnCode);
    this.previousFeedback.push(result);

    // win check
    if (result.hits === 4) {
      this.setState({
        hasWon: true,
        activeColumns: this.state.activeColumns + 1
      });
    } else {
      this.setState({
        activeColumns: this.state.activeColumns + 1
      });
    }

    if (this.state.activeColumns === this.state.numGuesses) {
      this.setState({ hasLost: true });
    }

    this.setState({ bestNextGuess: this.computeNextGuess() });

  };

  columnsRefs: (Column | null)[] = [];
  columns: any[] = [];

  renderColumns = () => {
    this.columns = [];

    for (let i = 0; i < this.state.numGuesses; i++) {
      this.columns.push(
        <Column
          numButtons={this.props.gameDifficulty === 'Insane' ? 5 : 4}
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
  };

  resetColumnCodes = () => {
    this.columnsRefs.forEach(ref => ref?.resetColumn());
  };

  resetGame = (streakAdd: boolean) => {
    this.previousGuesses = [];
    this.previousFeedback = [];
    this.solverGuessCount = 0;

    this.setState({
      gameStreak: streakAdd ? this.state.gameStreak + 1 : 0,
      activeColumns: 1,
      hasWon: false,
      hasLost: false,
      bestNextGuess: ['red','red','yellow','yellow'],
      finalCode: this.createFinalCode(this.props.gameDifficulty),
      numGuesses:
        this.props.gameDifficulty === 'Insane' ? 6 :
        this.props.gameDifficulty === 'Hard' ? 6 :
        this.props.gameDifficulty === 'Normal' ? 7 : 8
    });

    this.resetColumnCodes();
    this.resetHints();
  };

  resetHints = () => {
    this.setState({hintLimit:
      this.props.gameDifficulty === 'Insane' ? 0 :
      this.props.gameDifficulty === 'Hard' ? 1 :
      this.props.gameDifficulty === 'Normal' ? 2 : 3});
  }

  fillActiveColumnWithHint = () => {
    
    if (this.solverGuessCount < this.state.hintLimit) {
      const activeIndex = this.state.activeColumns - 1;
      const columnRef = this.columnsRefs[activeIndex];

      if (columnRef && this.state.bestNextGuess.length === 4) {
        columnRef.setColumnColors(this.state.bestNextGuess);
      }
      this.setState({
        hintLimit: this.state.hintLimit - 1
      })
    }
  };

  render() {
    return (
      <div className="Game">
        <Link to="/"><div className="titlescreen-return">Title Screen</div></Link>

        <div className="difficulty-display">{this.props.gameDifficulty} Difficulty</div>
        <div className="streak-display">Streak: {this.state.gameStreak}</div>

        <div className="restart" onClick={() => this.resetGame(this.state.hasWon)}>Restart</div>
        <div className="hint" onClick={this.fillActiveColumnWithHint}>Hints: {this.state.hintLimit}</div>


        <div className="guess-list">
          {this.renderColumns()}
          {(this.state.hasWon || this.state.hasLost) ? (
            <>
              <header className={`you-${this.state.hasWon ? "win" : "lose"}`}>
                {this.state.hasWon ? "YOU WIN!" : "YOU LOSE!"}
              </header>
              <AnswerColumnRevealed finalCode={this.state.finalCode} />
              <div className="play-again" onClick={() => this.resetGame(this.state.hasWon)}>Play Again</div>
            </>
          ) : (
            <AnswerColumnHidden finalCode={this.state.finalCode} />
          )}
        </div>
      </div>
    );
  }
}

export default Game;
