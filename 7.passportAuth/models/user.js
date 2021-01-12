const mongoose = require('mongoose'),
    {Schema} = mongoose,
    passportLocalMongoose = require('passport-local-mongoose');
// schema
const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'email is required'],
        unique: true
    }
})
userSchema.plugin(passportLocalMongoose);
// export Model
module.exports = mongoose.model('User', userSchema);