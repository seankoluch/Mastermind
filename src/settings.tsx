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
                    <li>8 total guesses</li>
                    <li>Only one of each color is allowed in the final answer</li>
                    <li>Example final answers:</li>
                </ul>
                <div className='rows'>
                    <ExampleColumn code={['red', 'fuchsia', 'white', 'dodgerblue']}/>
                    <ExampleColumn code={['yellow', 'white', 'red', 'lime']}/>
                    <ExampleColumn code={['lime', 'dodgerblue', 'yellow', 'fuchsia']}/>
                    <ExampleColumn code={['red', 'white', 'lime', 'yellow']}/>
                </div>
                </>
            )
        } else if (difficulty === 'Normal') {
            return (
                <>
                <ul className='bullets'>
                    <li>7 total guesses</li>
                    <li>Two of each color are allowed in the final answer</li>
                    <li>Example final answers (includes easy difficulty final answers):</li>
                </ul>
                <div className='rows'>
                    <ExampleColumn code={['red', 'yellow', 'yellow', 'fuchsia']}/>
                    <ExampleColumn code={['lime', 'white', 'white', 'lime']}/>
                    <ExampleColumn code={['white', 'fuchsia', 'red', 'red']}/>
                    <ExampleColumn code={['dodgerblue', 'yellow', 'dodgerblue', 'yellow']}/>
                </div>
                </>
            )
        } else {
            return (
                <>
                <ul className='bullets'>
                    <li>6 total guesses</li>
                    <li>Any amount of each color is allowed in the final answer</li>
                    <li>Example final answers (includes easy and normal difficulty final answers):</li>
                </ul>
                <div className='rows'>
                    <ExampleColumn code={['fuchsia', 'fuchsia', 'fuchsia', 'fuchsia']}/>
                    <ExampleColumn code={['yellow', 'red', 'yellow', 'yellow']}/>
                    <ExampleColumn code={['lime', 'lime', 'lime', 'white']}/>
                    <ExampleColumn code={['red', 'red', 'red', 'red']}/>
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