const express = require('express');
const app = express();

const jwt = require("jsonwebtoken");

// CONFIG MONGOOSE
require("../server/config/mongoose.config");

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

const sockets = require("socket.io");
const io = sockets(server, {cors: true});

let userObj = [];
let messageObj = [];


let emoji = [
    '🙈',
    '🙉', 
    '🙊', 
    '💥', 
    '💫', 
    '💦', 
    '💨', 
    '🐵', 
    '🐒', 
    '🦍', 
    '🦧', 
    '🐶', 
    '🐕', 
    '🦮', 
    '🐕‍🦺', 
    '🐩', 
    '🐺', 
    '🦊', 
    '🦝', 
    '🐱',
    '🐈',
    '🐈‍',
    '🦁',
    '🐯',
    '🐅',
    '🐆',
    '🐴',
    '🐎',
    '🦄',
    '🦓', 
    '🦌', 
    '🐮',
    '🐂', 
    '🐃',
    '🐄', 
    '🐷',
    '🐖',
    '🐗',
    '🐽',
    '🐏',
    '🐑',
    '🐐',
    '🐪',
    '🐫',
    '🦙',
    '🦒',
    '🐘',
    '🦏',
    '🦛',
    '🐭',
    '🐁',
    '🐀',
    '🐹',
    '🐰',
    '🐇',
    '🐿️',
    '🦔',
    '🦇', 
    '🐻',
    '🐼',
    '🦥',
    '🦘',
    '🦡',
    '🦃', 
    '🐔',
    '🐤',
    '🐦', 
    '🐧', 
    '🦅',
    '🦆',
    '🦢', 
    '🦉',
    '🦩',
    '🦜',
    '🐸',
    '🐊',
    '🐢',
    '🦎',
    '🐍',
    '🐉',
    '🐋',
    '🐬',
    '🐟',
    '🐠',
    '🐡',
    '🦈',
    '🐚',
    '🦋',
    '🐝',
    '🐞',
    '🕷️',
    '🌸',
    '🌹', 
    '🌺', 
    '🌻',
    '🌷', 
    '🌴',
    '🌵',
    '☘️',
    '🍀',
    '🍂',
    '🍄',
    '🌰',
    '🦞',
    '🌙',
    '☀️',
    '🌝',
    '🌟',
    '🌠',
    '⛅',
    '⛈️',
    '🌤️',
    '🌈',
    '☂️',
    '⚡',
    '❄️',
    '☃️', 
    '⛄', 
    '☄️', 
    '🔥',
    '💧',
    '🌊', 
    '🎄',
    '✨', 
    '🎋', 
    '🎍'
];


//time stamp
const timeStamp = () => {
    let date = new Date();
    const hour = date.getHours();
    const minute  = date.getMinutes();
    const seconds = date.getSeconds();
    let currentDate = `${hour}: ${minute}: ${seconds}`;
    return currentDate;
}

const newEmoj = () => {
    let randomIdx = Math.floor(Math.random() * emoji.length);
    let newUserEmoji = emoji[randomIdx];
    return newUserEmoji;
}

//socket transactions

io.on("join_room", (socket) => {
    console.log("A client connected: ", socket.id);

    socket.io("join_room", ({room, userName}) => {
        const user = {
            id: socket.id,
            userName: userName,
            room: room,
            emoji: newEmoj()
        }
    })

    console.log('user', user);
    userObj.push(user);

    socket.join(user.room);
    console.log(`${user.userName} joined room: `, user.room);

    socket.broadcast.to(user.room).emit("message from the server", {
        message: `${user.userName} has joined this room`,
        timeStamp: getTimeStamp(),
    });
    if (messageObj.filter((msg) => msg.room === room)) {
        const getThisRoomMessages = (room) => messageObj.filter((m) => m.room === room);
        const newUserRoomMessage = getThisRoomMessages(user.room);

        io.to(user.room).emit("Welcome and thank you for using this chat! Here is your data", newUserRoomMessage);
    }

    const getUsersFromRoom = (room) => userObj.filter((user) => user.room === room);
    io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getUsersFromRoom(user.room)
    })

    //server listens for this event 
    socket.on("event-from client", ({room, content: {userName, newMessage}}) => {
        const findUserEmoji = (userName) => {
            let userEmoji = userObj.find((u) => u.userName === userName).emoji;
            return userEmoji;
        } 
        //server messages to All Users/Rooms 
        messageObj.push({
            room: room,
            userName: userName,
            message: newMessage,
            cliend_id: socket.id,
            emoji: findUserEmoji(userName),
            timestamp: timeStamp()
        })

        //messages to new clients 
        let newMessageSentToClient = {
            userName: userName,
            message: newMessage,
            client_id: socket.id,
            emoji: findUserEmoji(userName),
            timeStamp: timeStamp()
        }

        //send specific messages to a specific room 
        io.to(room).emit("recieve_messsage", newMessageSentToClient);
    })

    socket.on("discconet", () => {
        console.log("User has disconnected", socket.id);
        const msgToDisconnectUser = (id) => {
            const idx = userObj.findIndex((user) => user.id === id);
            if (idx !== -1) {
                return userObj.splice(idx, 1)[0];
            }
        };

        const user = msgToDisconnectUser(socket.id);
        if (user) {
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getUsersFromRoom(user.room)
            });
        }
    });
});