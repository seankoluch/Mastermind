import './gamebutton.css';
import React from 'react';
import GameButtonSubmitted from './gamebuttonsubmitted';

interface ExampleColumnProps {
  code: string[];
  size: number;
}

const ExampleColumn: React.FC<ExampleColumnProps> = (props) => {
  return (
    <div className='column small'>
      {Array.from({ length: props.size }, (_, index) => (
        <GameButtonSubmitted color={props.code[index]}/>
      ))}
    </div>
  )
};

export default ExampleColumn;
