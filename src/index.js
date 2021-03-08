import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Reset extends React.Component {
  render() {
    return (
	<button
      className="reset"
      onClick={ () => this.props.onClick() }
	>
	Reset Button
	</button>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
	<button 
      className="square"
      onClick={ () => this.props.onClick() }
	>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
    };
  }

  handleClick(i) {
    if (this.state.squares[i] != null)  return;
    const newsquares = this.state.squares.slice();
    let ch = 'X';
    if (this.state.count % 2 == 0)  ch = 'O';
    newsquares[i] = ch;
    this.setState({squares: newsquares, count: this.state.count + 1});
  }

  handleReset() {
    this.setState({squares: Array(9).fill(null), count: 0});
  }

  renderSquare(i) {
    return (
	<Square 
      value={this.state.squares[i]}
      onClick={ () => this.handleClick(i) }
	/>
    );
  }

  renderReset() {
    return (
      <Reset
      onClick={ () => this.handleReset() }
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
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
