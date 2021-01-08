const express = require('express'),
    app = express(),
    session = require('express-session');
// 
app.use(session({
    secret:'thisismysecret',
    resave: false,
    saveUninitialized: false
}));
// routes
app.get('/', (req, res) => {
    res.send('go to /viewcount or /register or /greet');
})
app.get('/viewcount', (req,res) => {
    if(req.session.count){
        req.session.count += 1;
    }else{
        req.session.count = 1;
    }
    res.send(`You have visited this site ${req.session.count} times`)
})
// 
app.get('/register', (req, res) => {
    const {username="anonymous"} = req.query;
    req.session.username = username;
    res.redirect('/greet');
})
app.get('/greet', (req, res) => {
    res.send(`welcome back ${req.session.username}`)
})
// listener
app.listen(8080, () => console.log('session app served on port 8080'));