import './gamebutton.css';
import React from 'react';

const GameButtonHidden: React.FC = () => {
    const style = {
        backgroundColor: 'white'
    };

    return (
        <div className='GameButton hidden' style={style}>{'?'}</div>
    );
};

export default GameButtonHidden;