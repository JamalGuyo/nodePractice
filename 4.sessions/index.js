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
    res.send('go to /viewcount');
})
app.get('/viewcount', (req,res) => {
    if(req.session.count){
        req.session.count += 1;
    }else{
        req.session.count = 1;
    }
    res.send(`You have visited this site ${req.session.count} times`)
})
// listener
app.listen(8080, () => console.log('session app served on port 8080'));