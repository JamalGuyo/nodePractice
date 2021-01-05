const express = require('express'),
 app = express(),
 AppError = require('./utils/AppError'),
 mongoose = require('mongoose'),
 path = require('path'),
 methodOverride = require('method-override'),
 ejsMate = require('ejs-mate');
// routes
const farmRoutes = require('./routes/farm');
const productRoutes = require('./routes/product');
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
// configure ejsmate
app.engine('ejs', ejsMate);
// configure ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
// handle assets under public folder
app.use(express.static(path.join(__dirname, 'public')))
// 3rd party middleware to handle req.body
app.use(express.urlencoded({extended: true}));
// configure methodOverride to edit and delete 
app.use(methodOverride('_method'))
// =================================================================================
// routes
app.get('/', (req, res) => {
    res.render('index')
})
// imported routes
app.use('/farms/', farmRoutes);
app.use('/farms/:id/products/', productRoutes)
// 404 route
app.all('*', (req, res) => {
    throw new AppError('Page Not Found', 404);
})
// error handling middleware
app.use((err,req,res,next) => {
    const {status = 500} = err;
    if(!err.message) err.message ="something went wrong";
    res.status(status).render('error', {err});
})
// create listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))