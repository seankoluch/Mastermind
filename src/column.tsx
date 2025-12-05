import React from 'react';
import GameButton from './gamebutton';
import './grid.css';
import HitsBlowsDisplay from './hitsandblows';
import GameButtonInactive from './gamebuttoninactive';
import GameButtonSubmitted from './gamebuttonsubmitted';

interface ColumnProps {
  onSubmit: (code: string[]) => void;
  index: number;
  answer: string[];
  activeColumns: number;
  isGameOver: boolean;
  numButtons: number;
}

interface ColumnState {
  currentCode: string[];
  hits: number;
  blows: number;
}

function FindHitsAndBlows(code: string[], answer: string[]) {
  let hits: number = 0;
  let blows: number = 0;
  let map = new Map<string, number>();
  let hasHit = [];

  for (let i = 0; i < answer.length; i++) {
    if (map.get(answer[i]) === undefined) {
      map.set(answer[i], 1);
    } else {
      map.set(answer[i], map.get(answer[i])! + 1);
    }
  }

  for (let i = 0; i < code.length; i++) {
    if (code[i] === answer[i]) {
      hits++;
      map.set(code[i], map.get(code[i])! - 1);
      hasHit.push(i);
    }
  }

  for (let i = 0; i < code.length; i++) {
    if ((answer.includes(code[i])) && (answer.indexOf(code[i]) !== i)) {
      if ((map.get(code[i])! > 0) && !hasHit.includes(i)) {
        blows++;
        map.set(code[i], map.get(code[i])! - 1);
      }
    }
  }
  
  return [hits, blows];
}

class Column extends React.Component<ColumnProps, ColumnState> {
  colorSet: string[] = ['red', 'lime', 'white', 'dodgerblue', 'fuchsia', 'yellow'];

  constructor(props: ColumnProps) {
    super(props);
    this.state = {
      currentCode: Array(this.props.numButtons).fill('grey'),
      hits: 0,
      blows: 0
    };
  }

  resetColumn = () => {
    this.setState({
      currentCode: Array(this.props.numButtons).fill('grey'),
      hits: 0,
      blows: 0
    });
  };

  createActiveColumn = () => {
    return (
      <div className='column'>
      <div className='GuessHeader'>{this.props.index + 1}</div>
      <HitsBlowsDisplay hits={0} blows={0} />
      {this.props.isGameOver? (
        Array(this.props.numButtons).fill(<GameButtonSubmitted color={'grey'}/>))
      :(
        <>
          {Array.from({ length: this.props.numButtons }, (_, index) => (
            <GameButton
              index={index}
              colorSet={this.colorSet}
              colorSetCallBack={(colorIndex) => this.handleColorSetCallback(colorIndex, index)}
              color={this.state.currentCode[index]}
            />
          ))}
          <button onClick={this.handleSubmit} className='SubmitButton'>Submit</button>
        </>
      )}
    </div>
    )
  }

  setColumnColors(colors: string[]) {
    this.setState({ currentCode: [...colors] });
  }

  createInactiveColumn = () => {
    return (
    <div className='column inactive'>
      <div className='GuessHeader'>{this.props.index + 1}</div>
      <HitsBlowsDisplay hits={0} blows={0} />
      {Array(this.props.numButtons).fill(<GameButtonInactive/>)}
    </div>
    )
  }

  createSubmittedColumn = () => {
    return (
    <div className='column'>
      <div className='GuessHeader'>{this.props.index + 1}</div>
      <HitsBlowsDisplay hits={this.state.hits} blows={this.state.blows} />
      {Array.from({ length: this.props.numButtons }, (_, index) => (
        <GameButtonSubmitted color={this.state.currentCode[index]}/>
      ))}
    </div>
    )
  }

  handleColorSetCallback = (colorIndex: number, index: number) => {
    const newCode = [...this.state.currentCode];
    newCode[index] = this.colorSet[colorIndex];
    this.setState({ currentCode: newCode });
  };

  handleSubmit = () => {
    const hitsBlows: number[] = FindHitsAndBlows(this.state.currentCode, this.props.answer);
    this.setState({ hits: hitsBlows[0], blows: hitsBlows[1] }, () => {
      this.props.onSubmit(this.state.currentCode);
    });
  };

  
  render() {
    const isSubmitted = (this.props.index < this.props.activeColumns - 1);
    const isActive = (this.props.index === this.props.activeColumns - 1);

    return (
      <>
        { isSubmitted && <> {this.createSubmittedColumn()} </> }
        { isActive && <> {this.createActiveColumn()} </> }
        { !isSubmitted && !isActive && <> {this.createInactiveColumn()} </> }
      </>
    )
  }
}

export {
  FindHitsAndBlows,
  Column,
}