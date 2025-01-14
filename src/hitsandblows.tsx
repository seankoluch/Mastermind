import './App.css';
import React from 'react';
import './grid.css';
import './hitsandblows.css';

interface HitsBlowsProps {
  hits: number
  blows: number
}

class HitsBlowsDisplay extends React.Component<HitsBlowsProps> {

  render(): React.ReactNode {
    return (
      <div>
      <div className = 'hits-blows'>Hit: {this.props.hits}</div>
      <div className = 'hits-blows'>Miss: {this.props.blows}</div>
      </div>
    )
  }

}

export default HitsBlowsDisplay;