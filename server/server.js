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


let emjos = [
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
    let randomIdx = Math.floor(Math.random() * emjos.length);
    let newUserEmoji = emjos[randomIdx];
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


})