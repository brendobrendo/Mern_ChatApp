const mongoose = require("mongoose");

module.exports = db_name => {
    mongoose
    .connect(`mongodb://localhost/${db_name}`)
    .then(() => console.log(`Successfully connected to ${db_name}`))
    .catch(err => console.log("mongoose connection failed: ", err));
};