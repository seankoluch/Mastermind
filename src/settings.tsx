import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import ExampleColumn from './examplecolumn';

interface SettingsState {
    difficulty: string;
}

interface SettingsProps {
    onSubmit: (difficulty: string) => void;
    currentDifficulty: string;
}

class Settings extends React.Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps) {
        super(props);
        this.state = {
          difficulty: this.props.currentDifficulty,
        };
      }

    handleDifficultyChange = (newDifficulty: string) => {
        this.setState({ difficulty: newDifficulty });
    }

    onSubmit = () => {
        this.props.onSubmit(this.state.difficulty);
    };

    explainDifficulty = (difficulty: string) => {
        if (difficulty === 'Easy') {
            return (
                <>
                <ul className='bullets'>
                    <li>8 guesses, 3 hints</li>
                    <li>Only one of each color is allowed in the final answer</li>
                    <li>Example final answers:</li>
                </ul>
                <div className='rows'>
                    <ExampleColumn size={4} code={['red', 'fuchsia', 'white', 'dodgerblue']}/>
                    <ExampleColumn size={4} code={['yellow', 'white', 'red', 'lime']}/>
                    <ExampleColumn size={4} code={['lime', 'dodgerblue', 'yellow', 'fuchsia']}/>
                    <ExampleColumn size={4} code={['red', 'white', 'lime', 'yellow']}/>
                </div>
                </>
            )
        } else if (difficulty === 'Normal') {
            return (
                <>
                <ul className='bullets'>
                    <li>7 guesses, 2 hints</li>
                    <li>Two of each color are allowed in the final answer</li>
                    <li>Example final answers (includes easy difficulty final answers):</li>
                </ul>
                <div className='rows'>
                    <ExampleColumn size={4} code={['red', 'yellow', 'yellow', 'fuchsia']}/>
                    <ExampleColumn size={4} code={['lime', 'white', 'white', 'lime']}/>
                    <ExampleColumn size={4} code={['white', 'fuchsia', 'red', 'red']}/>
                    <ExampleColumn size={4} code={['dodgerblue', 'yellow', 'dodgerblue', 'yellow']}/>
                </div>
                </>
            )
        } else if (difficulty === "Hard") {
            return (
                <>
                <ul className='bullets'>
                    <li>6 guesses, 1 hint</li>
                    <li>Any amount of each color is allowed in the final answer</li>
                    <li>Example final answers (includes easy and normal difficulty final answers):</li>
                </ul>
                <div className='rows'>
                    <ExampleColumn size={4} code={['fuchsia', 'fuchsia', 'fuchsia', 'fuchsia']}/>
                    <ExampleColumn size={4} code={['yellow', 'red', 'yellow', 'yellow']}/>
                    <ExampleColumn size={4} code={['lime', 'lime', 'lime', 'white']}/>
                    <ExampleColumn size={4} code={['red', 'red', 'red', 'red']}/>
                </div>
                </>
            )
        } else {
            return (
                <>
                <ul className='bullets'>
                    <li>6 guesses, 0 hints</li>
                    <li>Any amount of each color is allowed in the final answer</li>
                    <li>Final code is 5 colors</li>
                    <li>Example final answers:</li>
                </ul>
                <div className='rows'>
                    <ExampleColumn size={5} code={['fuchsia', 'lime', 'fuchsia', 'lime', 'fuchsia']}/>
                    <ExampleColumn size={5} code={['yellow', 'yellow', 'yellow', 'red', 'dodgerblue']}/>
                    <ExampleColumn size={5} code={['lime', 'dodgerblue', 'yellow', 'fuchsia','red']}/>
                    <ExampleColumn size={5} code={['red', 'red', 'red', 'red', 'red']}/>
                </div>
                </>
            )

        }
    }

    render() {
    return (
        <div className="Settings">
            <div className="difficulty-select-container">
                <h1>Choose Difficulty</h1>
                <button 
                    className = {`TitleButton ${this.state.difficulty === 'Easy' ? 'selected easy' : ''}`}
                    onClick={() => this.handleDifficultyChange('Easy')}>Easy
                </button>
                <button 
                    className = {`TitleButton ${this.state.difficulty === 'Normal' ? 'selected normal' : ''}`}
                    onClick={() => this.handleDifficultyChange('Normal')}>Normal
                </button>
                <button 
                    className = {`TitleButton ${this.state.difficulty === 'Hard' ? 'selected hard' : ''}`}
                    onClick={() => this.handleDifficultyChange('Hard')}>Hard
                </button>
                <button 
                    className = {`TitleButton ${this.state.difficulty === 'Insane' ? 'selected insane' : ''}`}
                    onClick={() => this.handleDifficultyChange('Insane')}>Insane
                </button>
            </div>
            <div className="difficulty-explanation">
                <h1>{this.state.difficulty + ' Difficulty:'}</h1>
                {this.explainDifficulty(this.state.difficulty)}
                <Link to="/"><button className = 'TitleButton' onClick={this.onSubmit}>Select</button></Link>
            </div>
        </div>
    )}
}

export default Settings;