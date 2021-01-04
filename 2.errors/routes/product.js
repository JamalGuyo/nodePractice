const express = require('express'),
    router = express.Router();

// routes
router.get('/', (req, res) => {
    res.send('show all products')
})
router.get('/new', (req, res) => {
    res.send('show form to create new ')
})
router.post('/', (req, res) => {
    res.send('handle adding new product here')
})
router.get('/:id', (req, res) => {
    res.send('show one product')
})
// update
router.get('/:id/edit', (req, res) => {
    res.send('show edit form')
})
router.put('/:id', (req, res) => {
    res.send('update logic will be handled here')
})
// delete
router.delete('/:id', (req, res) => {
    res.send('handle delete logic here')
})
// export router
module.exports = router;