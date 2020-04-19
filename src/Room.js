import React from 'react';
import './Room.css';

export class Room extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.connection)
    this.state = {connection: props.connection};
    this.configureSocket.bind(this);
    this.configureSocket(props.connection);
  }

  render = () => {
    return (
    <section className="Room">
      <div className="shape">
        <div className="heart"></div>
      </div>
      <div className="shape">
        <div className="diamond"></div>
      </div>
      <div className="shape">
        <div className="club"></div>
      </div>
      <div className="shape">
        <div className="spade"></div>
      </div>
      <p>Room Code: {this.state.connection.roomCode}</p>
    </section>
    );
  }

  configureSocket = (connection) => {
    connection.socket.on("updateDeck", (deck) => {
      this.setState({deck: deck});
      alert("Deck updated");
    });

    connection.socket.on("newAttendee", (newAttendee) => {
      if (newAttendee.publicUserId !== this.state.publicUserId) {
        alert(newAttendee.name + " has joined")
      }
    });

  };
}

export default Room;
