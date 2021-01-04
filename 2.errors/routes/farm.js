const express = require('express'),
router = express.Router();
// 
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Farm = require('../models/farm');
//
// JOI SCHEMAS
const {farmSchema} = require('../joiSchema');
// JOI VALIDATION
const validateFarm = (req, res, next) => {
    const {error} = farmSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    }
    next();
}
// farm routes
// create and read
router.get('/', catchAsync(async(req, res) => {
    const farms = await Farm.find();
    res.render('farms/index', {farms})
}))

router.get('/new', (req, res) => {
    res.render('farms/new')
})

router.post('/',validateFarm, catchAsync(async(req, res) => {
   const {farm} = req.body;
   await Farm.create(farm); 
   res.redirect('/farms')
}))
// show specific farm
router.get('/:id', catchAsync(async(req, res) => {
    const farm = await Farm.findById(req.params.id);
    res.render('farms/show', {farm})
}))
// update
router.get('/:id/edit', catchAsync(async(req, res) => {
    const farm = await Farm.findById(req.params.id);
    res.render('farms/edit', {farm})
}))
router.put('/:id', validateFarm, catchAsync(async(req, res) => {
    await Farm.findByIdAndUpdate(req.params.id, req.body.farm);
    res.redirect(`/farms/${req.params.id}`)
}))
// delete
router.delete('/:id',catchAsync(async(req, res) => {
    await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms')
}))
// export farm router
module.exports = router;