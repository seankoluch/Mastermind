import './gamebutton.css';
import React from 'react';

interface GameButtonProps {
    colorSet: string[];
    colorSetCallBack: (colorIndex: number, buttonIndex: number) => void;
    index: number;
    color?: string; // <- new optional prop for external color
}

interface GameButtonState {
    colorIndex: number;
}

class GameButton extends React.Component<GameButtonProps, GameButtonState> {
    constructor(props: GameButtonProps) {
        super(props);
        this.state = {
            // If initial color prop is passed, use its index; otherwise -1
            colorIndex: props.color ? props.colorSet.indexOf(props.color) : -1
        };
    }

    componentDidUpdate(prevProps: GameButtonProps) {
        // Update internal state if color prop changes (for hints)
        if (this.props.color && this.props.color !== prevProps.color) {
            const newIndex = this.props.colorSet.indexOf(this.props.color);
            this.setState({ colorIndex: newIndex });
        }
    }

    getColor = () => {
        if (this.state.colorIndex === -1) return 'grey';
        return this.props.colorSet[this.state.colorIndex];
    }

    setColorIndex = (num: number) => {
        const { colorSet, colorSetCallBack } = this.props;
        let newIndex = num;

        if (num >= colorSet.length) newIndex = 0;
        if (num < 0) newIndex = colorSet.length - 1;

        this.setState({ colorIndex: newIndex }, () => {
            colorSetCallBack(this.state.colorIndex, this.props.index);
        });
    }

    render(): React.ReactNode {
        const style = { backgroundColor: this.getColor() };

        return (
            <div>
                <div className='GameButton' style={style}>
                    <div className="arrow left" onClick={() => this.setColorIndex(this.state.colorIndex - 1)}>{'<'}</div>  
                    <div className="arrow right" onClick={() => this.setColorIndex(this.state.colorIndex + 1)}>{'>'}</div>
                </div>
            </div>
        );
    }
}

export default GameButton;
