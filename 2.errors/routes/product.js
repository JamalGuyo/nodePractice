const express = require('express'),
    router = express.Router({mergeParams: true}),
    // error handlers
    AppError = require('../utils/AppError'),
    catchAsync = require('../utils/catchAsync'),
    // models
    Farm = require('../models/farm'),
    Product = require('../models/product');
// joi schemas
const {productSchema} = require('../joiSchema');
const validateProduct = (req, res, next) => {
    const {error} = productSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400)
    }
    next()
}
// 
const categories = ['fruit', 'vegetable', 'dairy'];
// routes
router.get('/', catchAsync(async(req, res) => {
    const products = await Product.find({});
    res.render('products/index', {products});
}))
router.get('/new', catchAsync(async(req, res) => {
    const farm = await Farm.findById(req.params.id);
    res.render('products/new', {farm,categories});
}))
router.post('/', validateProduct, catchAsync(async(req, res) => {
    const farm = await Farm.findById(req.params.id);
    const product = await Product.create(req.body.product);
    product.farm = farm;
    farm.products.push(product);
    await farm.save();
    await product.save();
    res.redirect(`/farms/${farm._id}`)
}))
router.get('/:productId', (req, res) => {
    res.send('show one product')
})
// update
router.get('/:productId/edit', (req, res) => {
    res.send('show edit form')
})
router.put('/:productId', (req, res) => {
    res.send('update logic will be handled here')
})
// delete
router.delete('/:productId', (req, res) => {
    res.send('handle delete logic here')
})
// export router
module.exports = router;