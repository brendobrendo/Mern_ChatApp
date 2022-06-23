// IMPORT PACKAGES
const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


// CONFIG MONGOOSE
require("./config/mongoose.config")(process.env.DB_NAME);

// CONFIG EXPRESS
// app.use(cors()) // Having 2 localhost port to communicate
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000'
}));
app.use(express.json())  // POST METHOD
app.use(cookieParser());
// Change the app.use(cors()) to the one below

// ROUTES
require("./routes/user.routes")(app)

// PORT
const server = app.listen(8000, () => console.log(`Listening on port: 8000`) );

const io = require('socket.io')(server, { cors: true });


io.on("connection", socket => {

    console.log(socket.id);
    
    
    // listen for a client event
    
    socket.on("General Chat", (client_input) => {
    
    console.log("you got mail", client_input);
    
    
    // emit this back to the client / everyone
    
    io.emit('message sent', client_input)
    
    }),
    
    
    
    // listen for a client event
    
    socket.on("let's game!", (client_input) => {
    
    console.log("you got mail", client_input);
    
    
    // emit this back to the client / everyone
    
    io.emit('game chat wrap up', client_input)
    
    }),

    // listen for a client event
    
    socket.on("anime time", (client_input) => {
    
        console.log("message to anime fans", client_input);
        
        
        // emit this back to the client / everyone
        
        io.emit('anime dicussion', client_input)
        
        })


});