const mongoose = require('mongoose');
// create farm schema
const farmSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Farm', farmSchema);