import React from 'react';
import './App.css';
import io from "socket.io-client"


const App = () => {
  return (
    <div className="App">
      <section className="login">
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
        <p>Connect to a session.</p>
        <form action="#">
          <label htmlFor="nameInput">Name: <input id="nameInput" type="text" /></label>
          <label htmlFor="roomCodeInput">Room Code: <input id="roomCodeInput" type="text" /></label>
          <button onClick={connectSocket}>Connect</button>
        </form>
      </section>
    </div>
  );
}

let public_user_id = "";

const connectSocket = (e) => {
  const nameInput = document.getElementById("nameInput").value;
  const roomCodeInput = document.getElementById("roomCodeInput").value;

  const joinRoomInput = {"name": nameInput, "roomCode": roomCodeInput}

  const session_socket = io("http://localhost:8080/");

  session_socket.emit("joinRoom", joinRoomInput);

  session_socket.on("joinedRoom", (joinedRoom, cb) => {
    alert("You have joined " + joinedRoom.roomCode);
    public_user_id = joinedRoom.public_user_id;
    cb(public_user_id);
  });

  session_socket.on("newAttendee", (newAttendee) => {
    if (newAttendee.public_user_id !== public_user_id) {
      alert(newAttendee.name + " has joined")
    }
  });

  session_socket.on("state", (state) => {
    alert(state);
  });

};

export default App;
