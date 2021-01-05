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
    const product = new Product(req.body.product);
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
router.get('/:productId/edit', catchAsync(async(req, res) => {
    const farm = await Farm.findById(req.params.id);
   const product = await Product.findById(req.params.productId);
   res.render('products/edit', {product, farm, categories}); 
}))
router.put('/:productId', validateProduct, catchAsync(async(req, res) => {
    await Product.findByIdAndUpdate(req.params.productId, req.body.product);
    res.redirect(`/farms/${req.params.id}/`)
}))
// delete
router.delete('/:productId', (req, res) => {
    res.send('handle delete logic here')
})
// export router
module.exports = router;