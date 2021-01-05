const mongoose = require('mongoose');
const {Schema} = mongoose;
const Product = require('./product');
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
farmSchema.post('findOneAndDelete', async function(farm){
    if(farm.products.length){
        await Product.deleteMany({_id: {$in: farm.products}})
    }
});

module.exports = mongoose.model('Farm', farmSchema);