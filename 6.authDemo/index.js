const express = require('express'),
app = express(),
path = require('path'),
ejs = require('ejs');
// configs
app.set('view engine', 'ejs');
app.set('view', path.join(__dirname, 'views'));
// routes
app.get('/register', (req, res) => {
    res.send('register route');
})

app.get('/secret', (req, res) => {
    res.send('secret page')
})
// serve app
app.listen(3000, () => console.log('listening on port 3000'));