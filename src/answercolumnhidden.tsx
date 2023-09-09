import React from 'react';
import './grid.css';
import HitsBlowsDisplay from './hitsandblows';
import GameButtonHidden from './gamebuttonhidden';

function AnswerColumnHidden() {

let answerColumnHidden=[];
for (let i = 0; i < 4; i++) {
    answerColumnHidden.push(<GameButtonHidden/>);
}

return (
    <div className='column'>
      <div className='GuessHeader invisible'>{'1'}</div>
      <HitsBlowsDisplay hits={0} blows={0} />
      <div className='boxed'>
      {answerColumnHidden}
      </div>
    </div>
)
}

export default AnswerColumnHidden;
