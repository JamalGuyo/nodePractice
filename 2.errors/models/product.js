const mongoose = require('mongoose');
// product schema
const productSchema = new mongoose.Schema({
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
    }
})

module.exports = mongoose.model('Product', productSchema);