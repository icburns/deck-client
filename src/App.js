import React from 'react';
import './App.css';
import io from "socket.io-client"


function App() {
  return (
    <div className="App">
      <header className="App-header">
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
          <label htmlFor="roomCodeInput">Room Code: <input id="roomCodeInput" type="text" /></label>
          <button onClick={connectSocket}>Connect</button>
        </form>
      </header>
    </div>
  );
}

const connectSocket = (e) => {
  const roomCodeInput = document.getElementById("roomCodeInput").value;

  const session_socket = io("http://localhost:8080/");

  session_socket.emit("joinRoom", roomCodeInput);

  session_socket.on("state", (state) =>{
    alert(state);
  });

};

export default App;
