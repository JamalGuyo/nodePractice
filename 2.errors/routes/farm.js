const express = require('express'),
router = express.Router();
//
const Farm = require('../models/farm');
// farm routes
// create and read
router.get('/', async(req, res) => {
    const farms = await Farm.find();
    res.render('farms/index', {farms})
})

router.get('/new', (req, res) => {
    res.render('farms/new')
})

router.post('/', async(req, res) => {
   const {farm} = req.body;
   await Farm.create(farm); 
   res.redirect('/farms')
})
// show specific farm
router.get('/:id', async(req, res) => {
    const farm = await Farm.findById(req.params.id);
    res.render('farms/show', {farm})
})
// update
router.get('/:id/edit', async(req, res) => {
    const farm = await Farm.findById(req.params.id);
    res.render('farms/edit', {farm})
})
router.put('/:id', async(req, res) => {
    await Farm.findByIdAndUpdate(req.params.id, req.body.farm);
    res.redirect(`/farms/${req.params.id}`)
})
// delete
router.delete('/:id', async(req, res) => {
    await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms')
})
// export farm router
module.exports = router;