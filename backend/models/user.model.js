let mongoose = require("mongoose");
let schema = mongoose.Schema;
let userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }

})
let user = mongoose.model("user", userSchema)
module.exports = user;