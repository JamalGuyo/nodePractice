const express = require('express'),
app = express();
const AppError = require('./utils/AppError');
const mongoose = require('mongoose')
// routes
const farmRoutes = require('./routes/farm');
// connect to db
mongoose.connect('mongodb://localhost:27017/demodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('connection to db successful'))
.catch(e => console.log(e))
// routes
app.get('/', (req, res) => {
    res.send('home page')
})
// imported routes
app.use('/farms/', farmRoutes);
// error handling middleware
app.use((err,req,res,next) => {
    const {status = 500, message ="something went wrong"} = err;
    res.status(status).send(message);
})
// create listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))