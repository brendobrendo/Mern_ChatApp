const express = require('express');
const app = express();

const jwt = require("jsonwebtoken");

// CONFIG MONGOOSE
require("./server/config/mongoose.config");

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

const sockets = require("socket.io");
const io = sockets(server, {cors: true});

let userObj = [];
let messageObj = [];

//time stamp
const timeStamp = () => {
    let date = new Date();
    const hour = date.getHours();
    const minute  = date.getMinutes();
    const seconds = date.getSeconds();
    let returnDate = `${hour}: ${minute}: ${seconds}`;
}