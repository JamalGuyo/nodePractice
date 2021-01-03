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
router.get('/:id', (req, res) => {
    res.send('show a single farm')
})
// update
router.get('/:id/edit', (req, res) => {
    res.send('show edit for for one specific famr');
})
router.put('/:id', (req, res) => {
    res.send('handle logic for editing a farm');
})
// delete
router.delete('/:id', (req, res) => {
    res.send('delete a single farm')
})
// export farm router
module.exports = router;