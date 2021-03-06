const express = require('express'),
    app = express(),
    path = require('path'),
    mongoose = require('mongoose'),
    // ejsmate
    ejsMate = require('ejs-mate'),
    // auth
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    session = require('express-session'),
    // model
    User = require('./models/user');
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
app.use(express.urlencoded({extended: true}))
// auth configs
app.use(session({
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// 
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})
const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next();
}
// routes
app.get('/', (req, res) => {
    res.render('index');
})

// register
app.get('/register', (req, res) => {
    res.render('users/register');
})
app.post('/register', async(req, res, next) => {
    const {username, email} = req.body;
    const user = await User.register(new User({username, email}), req.body.password);
    req.login(user, err => {
        if(err) return next(err);
        res.redirect('/');
    })
})
// login
app.get('/login', (req, res) => {
    res.render('users/login');
})
app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/')
})
//
app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
}) 
// 
app.get('/secret',isLoggedIn, (req, res) => {
    res.render('secret')
})
// listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))