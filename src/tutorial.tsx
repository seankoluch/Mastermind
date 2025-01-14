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
                Mastermind is a classic code-breaking game that challenges your 
                logical deduction skills. In this game, a secret code of four colors
                is randomly generated, and you must try to guess it within a limited number of attempts. 
                Here's how the game is played:
                <ol>
                    <li>You submit a guess of four colors.</li>
                    <li>
                        The game provides feedback on how accurate the guess is
                        using "hits" and "misses"
                        <ul>
                            <li>
                                A hit indicates that one of the colors in your guess
                                is both correct and in the correct position.
                            </li>
                            <li>
                                A miss indicates that one of the colors in your guess
                                is correct, but is NOT in the correct position. 
                            </li>
                            <li>
                                NO information is provided as to where these hits and misses
                                are in your guess, you must figure this out as you play.
                            </li>
                            <li>
                                Hits take priority over misses, meaning that if a color in your guess
                                is a hit, then misses cannot be created from that color.
                            </li>
                        </ul>
                    </li>
                    <li>Repeat steps 1. and 2. until you guess the final code, or run out of attempts.</li>
                </ol>
                On the right is an interactive tool for getting a grasp on how hits and misses work.
                There is an example final code, and you can change the colors of the guess to
                see how many hits and misses there would be if you were to submit that as a guess.
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