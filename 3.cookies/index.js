const express = require('express'),
    app = express();

// routes
app.get('/', (req, res) => {
    res.send('cookie root page')
}) 

app.get('/setname', (req, res) => {
    res.cookie('name', 'John');
    res.send('sent you a cookie')
})
// listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('serving cookie app'))