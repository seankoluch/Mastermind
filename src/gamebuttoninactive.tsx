import './gamebutton.css';
import React from 'react';

function GameButtonInactive() {
    const style = {
        backgroundColor: `grey`
    }
    return (
        <div className='GameButton' style={style}>
            <div className="arrow left inactive">{'<'}</div>  
            <div className="arrow right inactive">{'>'} </div>
        </div>
    )
}

export default GameButtonInactive;