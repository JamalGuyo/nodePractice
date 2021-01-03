const express = require('express'),
app = express(),
 AppError = require('./utils/AppError'),
 mongoose = require('mongoose'),
 path = require('path');
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
// ================================================================================
// CONFIGURATIONS
// configure ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
// handle assets under public folder
app.use(express.static(path.join(__dirname, 'public')))
// 3rd party middleware to handle req.body
app.use(express.urlencoded({extended: true}));
// =================================================================================
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