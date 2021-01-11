const mongoose = require('mongoose'),
    {Schema} = mongoose;
// schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username cannot be blank"]
    },
    password: {
        type: String,
        required: [true, "password cannot be blank"]
    }
})

// export model
module.exports = mongoose.model('User', userSchema);