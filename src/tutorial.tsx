import './App.css';
import React from 'react';
import TutorialTool from './tutorialtool';
import { Link } from 'react-router-dom';

function Tutorial() {
    return (
        <div className="Tutorial">
            <div className='game-explanation'>
            <h1>How to Play</h1>
            <p className="text">
                Hit and Blow, commonly known as Mastermind, is a classic code-breaking
                game that challenges your logical deduction skills. In this game, a
                secret code is randomly generated, and you must try to guess it
                within a limited number of attempts. Here's how the game is played:
                <ol>
                    <li>You submit a guess</li>
                    <li>
                        The game provides feedback on how accurate the guess is
                        using "hits" and "blows"
                        <ul>
                            <li>
                                A "hit" (depicted as <div className="circle hit small"></div> ) 
                                indicates that one of the guessed colors
                                is both a correct color and in the correct position.
                            </li>
                            <li>
                                A "blow" (depicted as <div className="circle blow small"></div> ) 
                                indicates that one of the guessed colors
                                is a correct color, but is NOT in the correct position. 
                            </li>
                            <li>
                                Hits and Blows do NOT give any information
                                about the colors they belong to, they simply mean that 
                                you have a hit or blow somewhere in the guess. Hits take 
                                priority over blows, meaning that if a color is a hit, 
                                then blows cannot be created from that color.
                            </li>
                        </ul>
                    </li>
                    <li>Repeat steps 1. and 2. until you guess the final code, or run out of attempts</li>
                </ol>
                On the right is an interactive tool for getting a grasp on how hits and blows work.
                There is an example "final answer", and you can change the colors of the guess to
                see how many hits and blows there would be if you were to submit that as a guess.
                You can regenerate the final answer to try different answers.
            </p>
            <Link to="/"><div className="titlescreen-return">Title Screen</div></Link>
        </div>
            <div className='tutorial-tools'>
                <TutorialTool/>
            </div>
        </div>
    )
}

export default Tutorial;