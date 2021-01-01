const express = require('express'),
app = express();
// routes
app.get('/', (req, res) => {
    res.send('home page')
})
// create listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))