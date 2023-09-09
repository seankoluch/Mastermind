import React from 'react';
import { FindHitsAndBlows } from './column';
import GameButton from './gamebutton';
import HitsBlowsDisplay from './hitsandblows';
import GameButtonSubmitted from './gamebuttonsubmitted';

class TutorialTool extends React.Component {
  colorSet: string[] = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];
  state: {
    hits: number;
    blows: number;
    activeGuess: string[];
    finalCode: string[];
  };
  
  constructor(props: {}) {
    super(props);
    this.state = {
      hits: 0,
      blows: 0,
      activeGuess: Array(4).fill('grey'),
      finalCode: this.generateRandomFinalCode()
    };
  }

  generateRandomFinalCode() {
    const finalCode = [];
    for (let i = 0; i < 4; i++) {
      finalCode.push(this.colorSet[Math.floor(Math.random() * this.colorSet.length)]);
    }
    return finalCode;
  }

  createAnswerColumn() {
    return (
      <div className='column'>
        <HitsBlowsDisplay hits={0} blows={0} />
        {this.state.finalCode.map((color: string, index: number) => (
          <GameButtonSubmitted color={color}/>
        ))}
        <button onClick={this.shuffleFinalAnswer} className='SubmitButton shuffle-button'>Reshuffle</button>
      </div>
    );
  }

  createActiveColumn() {
    return (
      <div className='column'>
        <HitsBlowsDisplay hits={this.state.hits} blows={this.state.blows} />
        {this.state.activeGuess.map((color: string, index: number) => (
          <GameButton
            key={index}
            index={index}
            colorSet={this.colorSet}
            colorSetCallBack={this.handleColorChange}
          />
        ))}
      </div>
    );
  }

  handleColorChange = (colorIndex: number, index: number) => {
    const activeGuess = [...this.state.activeGuess];
    activeGuess[index] = this.colorSet[colorIndex];
    this.setState({ activeGuess: activeGuess }, () => {
      this.checkGuess();
    });
  };

  checkGuess = () => {
    const [hits, blows] = FindHitsAndBlows(this.state.activeGuess, this.state.finalCode);
    this.setState({ hits: hits, blows: blows });
  };

  shuffleFinalAnswer = () => {
    const finalCode = this.generateRandomFinalCode();
    this.setState({ finalCode: finalCode }, () => {
      this.checkGuess();
    });
  };

  render() {
  return (
    <div className="guess-tool">
      {this.createActiveColumn()}
      {this.createAnswerColumn()}
    </div>
  );
  }
}

export default TutorialTool;
