import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}

function Reset(props) {
  return (
      <button className="reset" onClick={props.onClick}>
      ResetButtonnnnn
    </button>    
  );
}

function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
  );
}

class Board extends React.Component {

  renderReset() {
    return (
      <Reset
      onClick={ () => this.props.resetClick() }
      />
    );
  }

  renderSquare(i) {
    return (
	<Square 
      value={this.props.squares[i]}
      onClick={ () => this.props.squareClick(i) }
	/>
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
	<div className="resetButton">
	{this.renderReset()} 
	</div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
	squares: Array(9).fill(null),
      }],
      turnCount: 0
    };
  }

  handleReset() {
    this.setState({
      history: [{
	squares: Array(9).fill(null),
      }],
      turnCount: 0
    });
  }

  handleSquare(i) {
    // l ... mean local
    const lhistory = this.state.history;
    const lcurrent = lhistory[lhistory.length - 1];
    const lsquares = lcurrent.squares.slice();

    if (lsquares[i] || calculateWinner(lsquares))  return;
    lsquares[i] = this.state.turnCount % 2 == 0 ? 'O' : 'X';
    this.setState({
      history: lhistory.concat([{
	squares: lsquares,
      }]),
      turnCount: this.state.turnCount + 1,
    });
  }


  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner)  status = 'WINNER : ' + winner + ' !';
    else  status = 'Next Player : ' + (this.state.turnCount % 2 == 0 ? 'O' : 'X');

    return (
      <div className="game">
        <div className="game-board">
          <Board 
      squares={current.squares}
      squareClick={(i) => this.handleSquare(i)}
      resetClick={() => this.handleReset()}
	/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
