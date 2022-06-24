const express = require('express');
const app = express();
const cors = require('cors')
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
require('dotenv').config()

require("./config/mongoose.config")(process.env.DB_NAME);

app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000'
}));
app.use(express.json())  
app.use(cookieParser());

require("./routes/user.routes")(app)
//Try commenting out the server instance you created on line 19
const server = app.listen(process.env.DB_PORT, () =>
    console.log(`Listening on port ${process.env.DB_PORT}`)
);

app.get("/", (req, res) => res.send("Hello World"))
// replace the server arg for app and see if it will run for you.
const io = require('socket.io')(server, { cors: true });

io.on("connection", socket => {
    console.log(socket.id);
    // listen for a client event
    socket.on("event_from_client", (data) => {
    socket.broadcast.emit('sent_data_to_all_others_clients',data)
    });
});
