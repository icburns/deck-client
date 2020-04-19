import React from 'react';
import './Configure.css';
import io from "socket.io-client"

export class Configure extends React.Component {

  connectionCallback;
  actions = ["ReverseLunge",
  "Pushup",
  "Bridge",
  "Squat",
  "MountainClimber",
  "BodyPlankSaw",
  "FlutterKick",
  "RollUp",
  "SumoSquatJump"];


  constructor(props) {
    super(props);
    this.state = {actions: this.actions}

    this.connectionCallback = props.connectionCallback;
    this.connectSocket.bind(this);
  }

  render = () => {
    return (
      <section className="Configure">
        <p>Connect to a session.</p>
        <form action="#">
          <fieldset>
            <label htmlFor="nameInput">Name: </label><input id="nameInput" type="text" />
            <label htmlFor="roomCodeInput">Room Code: </label><input id="roomCodeInput" type="text" />
          </fieldset>
          <button onClick={this.connectSocket}>Connect</button>
          <fieldset>
            <div>
              <div className="shape">
                <div className="club"></div>
              </div>
              <label htmlFor="clubsInput">Clubs: </label>
              <select id="clubsInput" defaultValue="ReverseLunge">{this.state.actions.map((x,y) => <option key={y}>{x}</option>)}</select>
            </div>
            <div>
              <div className="shape">
                <div className="diamond"></div>
              </div>
              <label htmlFor="diamondsInput">Diamonds: </label><select id="diamondsInput" defaultValue="Pushup">{this.state.actions.map((x,y) => <option key={y}>{x}</option>)}</select>
            </div>
            <div>
              <div className="shape">
                <div className="spade"></div>
              </div>
              <label htmlFor="spadesInput">Spades: </label><select id="spadesInput" defaultValue="Bridge">{this.state.actions.map((x,y) => <option key={y}>{x}</option>)}</select>
            </div>
            <div>
              <div className="shape">
                <div className="heart"></div>
              </div>
              <label htmlFor="heartsInput">Hearts: </label><select id="heartsInput" defaultValue="Squat">{this.state.actions.map((x,y) => <option key={y}>{x}</option>)}</select>
            </div>
            <div>
              <label htmlFor="jacksInput">Jacks: </label><select id="jacksInput" defaultValue="MountainClimber">{this.state.actions.map((x,y) => <option key={y}>{x}</option>)}</select>
            </div>
            <div>
              <label htmlFor="queensInput">Queens: </label><select id="queensInput" defaultValue="BodyPlankSaw">{this.state.actions.map((x,y) => <option key={y}>{x}</option>)}</select>
            </div>
            <div>
              <label htmlFor="kingsInput">Kings: </label><select id="kingsInput" defaultValue="FlutterKick">{this.state.actions.map((x,y) => <option key={y}>{x}</option>)}</select>
            </div>
            <div>
              <label htmlFor="acesInput">Aces: </label><select id="acesInput" defaultValue="RollUp">{this.state.actions.map((x,y) => <option key={y}>{x}</option>)}</select>
            </div>
            <div>
              <label htmlFor="jokersInput">Jokers: </label><select id="jokersInput" defaultValue="SumoSquatJump">{this.state.actions.map((x,y) => <option key={y}>{x}</option>)}</select>
            </div>
          </fieldset>
        </form>
      </section>
    );
  }

  connectSocket = (e) => {
    const nameInput = document.getElementById("nameInput").value;
    const roomCodeInput = document.getElementById("roomCodeInput").value;

    const joinRoomInput = {"name": nameInput, "roomCode": roomCodeInput}

    let socket = io("http://localhost:8080/");

    socket.emit("joinRoom", joinRoomInput);

    socket.on("joinedRoom", (joinedRoom) => {
      alert("You have joined " + joinedRoom.roomCode);
      this.connectionCallback(socket, joinedRoom.publicUserId, joinedRoom.roomCode, joinedRoom.deck);
    });
  };
}

export default Configure;
