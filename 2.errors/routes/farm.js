const express = require('express'),
router = express.Router();
// farm routes
// create and read
router.get('/', (req, res) => {
    res.send('get all farms from db')
})

router.get('/new', (req, res) => {
    res.send('show form to add new farm')
})

router.post('/', (req, res) => {
    res.send('handle logic of adding new farm');
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