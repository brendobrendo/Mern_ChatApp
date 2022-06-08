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
  const [roomConnected, setRoomConnected] = useState("");

  const [dataArrObj_from_server, setDataArrObj_from_server] = useState([
    {
      userName: "",
      emoji: "🌈",
      message: "Welcome to the chat room",
      dateSent: "...."
    },
  ]);

  //client message 
  const [newMessage, setNewMessage] = useState("");

  //functions

  const loginHandler = (e) => {
    e.preventDefault();
    if (!userName || userName.trim() === "" || userName.trim().length < 4 || userName.trim().length > 10 || userName === "" || userNameError) {
      return; 
    } else {
      setUserLoggedIn(true);
      setRoom(selectedRoom);
      socket.emit("join_room", {room: selectedRoom, userName});
      }
  }

  useEffect(() => {
    //get all data upon login 

    socket.io("from server- here is your data", (all_messages) => {
      //set and display all messages when user logs in
      setDataArrObj_from_server((previousData) => {
        return [...previousData, all_messages];
      })
    })

    socket.io('greetings from server', ({message, timeStamp}) => {
      setDataArrObj_from_server((previousData) => {
        console.log('somone joined > previous Data = ', previousData);
        return [
          ...previousData,
          {
            userName: "",
            emoji: "🐒 ",
            message: message,
            timeStamp: timeStamp
          },
        ];
      });
    });

    socket.prependAny('roomUsers', ({room, users}) => {
      console.log(`we are in room: ${room}`);
      console.log(`users connected to ${room} = ${users}`);
      setRoomConnected(room);
      setUsersConnected(users);
    });

    socket.on("disconnected_user", ({user, timeStamp, emoji}) => {
      console.log(`user: ${user} disconnected`);
      setDataArrObj_from_server((previousStateData) => {
        return [...previousStateData,
        {
          client_id: "",
          timeStamp,
          emoji: "❌",
          message: `${user} ${emoji} has left the room`,
          userName: ""
        },
      ];
      });
    });
    //update chat from others
    socket.on("recieve message", (datArr) => {
      setDataArrObj_from_server((previousStateData) => {
        return [...previousStateData, datArr];
      });
    });
  });
  
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
