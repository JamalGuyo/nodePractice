const mongoose = require('mongoose');
const {Schema} = mongoose;
// product schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        min: 0,
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm:{
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

module.exports = mongoose.model('Product', productSchema);