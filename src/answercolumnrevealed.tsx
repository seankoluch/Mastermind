import React from 'react';
import './grid.css';
import GameButtonSubmitted from './gamebuttonsubmitted';

interface AnswerColumnRevealedProps {
    finalCode: string[]
}

class AnswerColumnRevealed extends React.Component<AnswerColumnRevealedProps> {
    render() {
        let answerColumnRevealed=[];
        for (let i = 0; i < this.props.finalCode.length; i++) {
            answerColumnRevealed.push(<GameButtonSubmitted color={this.props.finalCode[i]}/>);
        }

        return (
            <div className='column'>
                <div className='GuessHeader invisible'>{'1'}</div>
                <div className='container'></div>
                <div className='boxed'>
                    {answerColumnRevealed}
                </div>
            </div>
        )
    }
}

export default AnswerColumnRevealed;
