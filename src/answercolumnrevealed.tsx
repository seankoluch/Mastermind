import React from 'react';
import './grid.css';
import HitsBlowsDisplay from './hitsandblows';
import GameButtonSubmitted from './gamebuttonsubmitted';

interface AnswerColumnRevealedProps {
    finalCode: string[]
}

class AnswerColumnRevealed extends React.Component<AnswerColumnRevealedProps> {
render() {
let answerColumnRevealed=[];
for (let i = 0; i < 4; i++) {
    answerColumnRevealed.push(<GameButtonSubmitted color={this.props.finalCode[i]}/>);
}

return (
    <div className='column'>
      <div className='GuessHeader invisible'>{'1'}</div>
      <HitsBlowsDisplay hits={0} blows={0} />
      <div className='boxed'>
      {answerColumnRevealed}
      </div>
    </div>
)
}
}

export default AnswerColumnRevealed;
