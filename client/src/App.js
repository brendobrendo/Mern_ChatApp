import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useRef} from "react";
import io from "socket.io-client";

function App() {
  const [socket] = useState(() => io(":1337"));

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [room, setRoom] = useState("");
  
  const [usersConnected, setUsersConnected] = useState([]);
  const [roomConnected, setRoomCOnnected] = useState("");
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
