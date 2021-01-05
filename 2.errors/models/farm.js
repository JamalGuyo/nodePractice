const mongoose = require('mongoose');
const {Schema} = mongoose;
// create farm schema
const farmSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    products:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});
module.exports = mongoose.model('Farm', farmSchema);