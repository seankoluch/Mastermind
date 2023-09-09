import './gamebutton.css';
import React from 'react';

interface GameButtonSubmittedProps {
    color: string;
}

const GameButtonSubmitted: React.FC<GameButtonSubmittedProps> = (props) => {
    const style = {
        backgroundColor: props.color
    };

    return (
        <div className='GameButton' style={style}></div>
    );
};

export default GameButtonSubmitted;
