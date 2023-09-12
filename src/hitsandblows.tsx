import './App.css';
import React from 'react';
import './grid.css';
import './hitsandblows.css';

interface HitsBlowsProps {
  hits: number
  blows: number
}

class HitsBlowsDisplay extends React.Component<HitsBlowsProps> {
  renderHitsAndBlows = (hits: number, blows: number) => {
  const circles: JSX.Element[] = [];
  
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (hits > 0) {
        circles.push(<div className="circle hit"></div>);
        hits--;
      } else if (blows > 0) {
        circles.push(<div className="circle blow"></div>);
        blows--;
      } else {
        circles.push(<div className="circle empty"></div>);
      }
    }
  }
  
  return circles;
  };
  
  render(): React.ReactNode {
    return <div className='container'>{this.renderHitsAndBlows(this.props.hits, this.props.blows)}</div>;
  }
}

export default HitsBlowsDisplay;