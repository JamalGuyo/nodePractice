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