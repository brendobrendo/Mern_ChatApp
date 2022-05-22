const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/chatroomdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=> console.log("Connection has been eastablised with database"))
    .catch(err => console.log(err, "Error alert!"))