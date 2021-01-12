const express = require('express'),
    app = express(),
    path = require('path'),
    // ejsmate
    ejsMate = require('ejs-mate');
// configure ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// routes
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/secret', (req, res) => {
    res.render('secret')
})
// listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))