const express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser');
// 
app.use(cookieParser('thisismysecret'));

// routes
// unsigned cookies
app.get('/', (req, res) => {
    const {name= 'Jane Doe'} = req.cookies;
    res.send(`hello there ${name}`)
}) 

app.get('/setname', (req, res) => {
    res.cookie('name', 'John');
    res.send('sent you a cookie')
})
// signed cookies
// create signed cookies
app.get('/signcookie', (req, res) => {
    res.cookie('fruit', 'grape', {signed: true});
    res.send('signed your cookie');
})
app.get('/showsign', (req, res) => {
    res.send(req.signedCookies)
})
// listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('serving cookie app'))