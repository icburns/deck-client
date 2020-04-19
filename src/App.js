import React from 'react';
import Configure from './Configure';
import Room from './Room';
import './App.css';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {connection: undefined};
    this.connectionCallback.bind(this);
  }

  render = () => {
    console.log(this.state.connection);
    if (this.state.connection) {
      return (
        <div className="App">
          <Room connection={this.state.connection} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Configure connectionCallback={this.connectionCallback} />
        </div>
      );
    }
  }

  connectionCallback = (socket, publicUserId, roomCode, deck) => {
    let connection = {
      socket: socket,
      publicUserId: publicUserId,
      roomCode: roomCode,
      deck: deck
    };

    this.setState({connection: connection});
    console.log("set connection");
  }
}

export default App;
