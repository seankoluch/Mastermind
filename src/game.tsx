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
  activeColumns: number
  hasWon: boolean
  hasLost: boolean
  finalCode: string[]
  numGuesses: number
}

class Game extends React.Component<GameProps, GameState> {

  constructor(props: GameProps) {
    super(props);
    this.state = {
      activeColumns: 1,
      hasWon: false,
      hasLost: false,
      finalCode: this.createFinalCode(this.props.gameDifficulty),
      numGuesses: this.props.gameDifficulty === 'Hard'? 6:(this.props.gameDifficulty === 'Normal')? 7: 8
    };
  }

  createFinalCode = (gameDifficulty: string) => {
  if (gameDifficulty === 'Easy') {
    const colorPalette = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];

    const shuffleArray = (array: string[]): string[] => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
      }
      return array;
    };
    return shuffleArray(colorPalette).slice(0, 4);
  } else if (gameDifficulty === 'Normal') {
    const colorPalette = ['red', 'red', 'lime', 'lime', 'white', 'white',
                          'dodgerblue', 'dodgerblue', 'fuchsia', 'fuchsia', 'yellow', 'yellow'];

    const shuffleArray = (array: string[]): string[] => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
      }
      return array;
    };
    return shuffleArray(colorPalette).slice(0, 4);
  } else {
    const colorPalette = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];
    const array: string[] = [];

    for (let i = 0; i < 4; i++) {
      array.push(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    }
    return array;
  }
  }

  onSubmit = (columnCode: string[]) => {
    if (columnCode.includes('grey')) {
      
    }
    else if (columnCode.join() === this.state.finalCode.join()) {
      this.setState({ activeColumns: this.state.activeColumns + 1})
      this.setState({hasWon: true});
    } else {
      this.setState({ activeColumns: this.state.activeColumns + 1})
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

  resetGame = () => {
    this.setState({
      activeColumns: 1,
      hasWon: false,
      hasLost: false,
      finalCode: this.createFinalCode(this.props.gameDifficulty),
      numGuesses: this.props.gameDifficulty === 'Hard' ? 6 : (this.props.gameDifficulty === 'Normal') ? 7 : 8
    });

    this.resetColumnCodes();
  }

  render() {
    return (
      <div className="Game">
        <Link to="/"><div className="titlescreen-return">Title Screen</div></Link>
        <div className="restart" onClick={() => {this.resetGame()}}>Restart</div>
        <div className="guess-list">
          {this.renderColumns()}
          {(this.state.hasWon || this.state.hasLost)? 
            <>
              <header className= {`you-${this.state.hasWon ? 'win' : 'lose'}`}>{this.state.hasWon?'YOU WIN!':'YOU LOSE!'}</header>
              <AnswerColumnRevealed finalCode={this.state.finalCode}/>
              <div className="play-again" onClick={() => {this.resetGame()}}>Play Again</div>
            </>:
          <AnswerColumnHidden/>}
        </div>
      </div>
    )
  }
}

export default Game;