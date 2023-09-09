import './App.css';
import './titlebutton.css';
import React from 'react';
import { Link } from 'react-router-dom';

function TitleScreen() {
    return (
        <div className = "TitleScreen">
            <h1>Hit and Blow!</h1>
            <Link to ="/Game">
                <button className = 'TitleButton'>Start Game</button>
            </Link>
            <Link to ="/HowToPlay">
                <button className = 'TitleButton'>How To Play</button>
            </Link>
            <Link to ="/Settings">
                <button className = 'TitleButton'>Choose Difficulty</button>
            </Link>
        </div>
    )
}

export default TitleScreen;