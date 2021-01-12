const express = require('express'),
    app = express(),
    path = require('path'),
    mongoose = require('mongoose'),
    // ejsmate
    ejsMate = require('ejs-mate');
// connect to db
mongoose.connect('mongodb://localhost:27017/passportdemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('connection to passportdemo db successful'))
.catch(e => console.log(e));
// configure ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// routes
app.get('/', (req, res) => {
    res.render('index');
})

// register
app.get('/register', (req, res) => {
    res.render('users/register');
})
// login
app.get('/login', (req, res) => {
    res.render('users/login');
})
app.get('/secret', (req, res) => {
    res.render('secret')
})
// listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))