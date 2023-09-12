import './gamebutton.css';
import React from 'react';

interface GameButtonProps {
    colorSet: string[];
    colorSetCallBack: (colorIndex: number, buttonIndex: number) => void;
    index: number;
}

interface GameButtonState {
    colorIndex: number;
}

class GameButton extends React.Component<GameButtonProps, GameButtonState>{
    constructor(props: GameButtonProps){
        super(props);
        this.state = {colorIndex: -1};
    }

    getColor = () => {
        if(this.state.colorIndex === -1){
            return 'grey';
        } else {
            return this.props.colorSet[this.state.colorIndex];
        }
      }

    setColorIndex = (num: number) => {
        const {colorSet, colorSetCallBack} = this.props;
        if(num >= colorSet.length){
            this.setState({colorIndex: 0}, () => {
                colorSetCallBack(this.state.colorIndex, this.props.index);
            })
        } else if(num < 0) {
            this.setState({colorIndex: colorSet.length - 1}, () => {
                colorSetCallBack(this.state.colorIndex, this.props.index);
            });
        } else {
            this.setState({colorIndex: num}, () => {
                colorSetCallBack(this.state.colorIndex, this.props.index);
            });
        }
    }

    render(): React.ReactNode {
        const style = {
            backgroundColor: `${this.getColor()}`
        }
        return (
            <div>
                <div className='GameButton' style={style}>
                    <div className="arrow left" onClick={() => this.setColorIndex(this.state.colorIndex - 1)}>{'<'}</div>  
                    <div className="arrow right" onClick={() => this.setColorIndex(this.state.colorIndex + 1)}>{'>'}</div>
                </div>
            </div>
        )
    }
}

export default GameButton;