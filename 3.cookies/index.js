const express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser');
// 
app.use(cookieParser());

// routes
app.get('/', (req, res) => {
    const {name= 'Jane Doe'} = req.cookies;
    res.send(`hello there ${name}`)
}) 

app.get('/setname', (req, res) => {
    res.cookie('name', 'John');
    res.send('sent you a cookie')
})
// listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('serving cookie app'))