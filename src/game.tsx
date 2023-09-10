import './App.css';
import React, { useState } from 'react';
import './grid.css';
import { Column } from './column';
import AnswerColumnHidden from './answercolumnhidden';
import AnswerColumnRevealed from './answercolumnrevealed';
import { Link } from 'react-router-dom';

interface GameProps {
  finalCode: string[]
  numColumns: number
}

const Game: React.FC<GameProps> = (props) => {
  const columns = [];
  const [activeColumns, setActiveColumns] = useState(1);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const isGameOver: boolean = hasWon || hasLost;

  const onSubmit = (columnCode: string[]) => {
    if (columnCode.includes('grey')) {
      
    }
    else if (columnCode.join() === props.finalCode.join()) {
      setActiveColumns(activeColumns + 1);
      setHasWon(true);
    } else {
      setActiveColumns(activeColumns + 1)
      if (activeColumns === props.numColumns) {
        setHasLost(true);
      };
    }
  }

  for (let i = 0; i < props.numColumns; i++) {
    columns.push(<Column 
    activeColumns={activeColumns}
    index={i} 
    onSubmit={onSubmit}
    answer={props.finalCode}
    isGameOver={isGameOver}/>)
  }

    return (
      <div className="Game">
        <Link to="/"><div className="titlescreen-return">Title Screen</div></Link>
        <div className="restart" onClick={() => {setActiveColumns(1); setHasLost(false); setHasWon(false)}}>Restart</div>
        <div className="guess-list">
          {columns}
          {hasWon? 
            <>
              <header className="you-win">YOU WIN!</header>
              <AnswerColumnRevealed finalCode={props.finalCode}/>
              <div className="play-again" onClick={() => {setActiveColumns(1); setHasLost(false); setHasWon(false)}}>Play Again</div>
            </>:
          hasLost?
            <>
              <header className="you-lose">YOU LOSE!</header>
              <AnswerColumnRevealed finalCode={props.finalCode}/>
              <div className="play-again" onClick={() => {setActiveColumns(1); setHasLost(false); setHasWon(false)}}>Play Again</div>
            </>:
          <AnswerColumnHidden/>}
        </div>
      </div>
    )
}

export default Game;