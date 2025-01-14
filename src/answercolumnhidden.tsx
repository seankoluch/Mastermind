import React from 'react';
import './grid.css';
interface AnswerColumnHiddenProps {
  finalCode: string[]
}

class AnswerColumnHidden extends React.Component<AnswerColumnHiddenProps> {
render() {
  let answerColumnHidden=[];
  for (let i = 0; i < this.props.finalCode.length; i++) {
    answerColumnHidden.push(<div className='GameButton hidden'>?</div>);
  }

  return (
    <div className='column'>
      <div className='GuessHeader invisible'>{'1'}</div>
      <div className='container'></div>
      <div className='boxed'>
        {answerColumnHidden}
      </div>
    </div>
  )
}
}


export default AnswerColumnHidden;
