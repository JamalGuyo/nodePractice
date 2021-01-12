const express = require('express'),
app = express(),
path = require('path'),
bcrypt = require('bcrypt'),
mongoose = require('mongoose');
// 
const User = require('./models/user');
// 
const session = require('express-session');
// db
mongoose.connect('mongodb://localhost:27017/authdemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('connected to authdemo db'))
.catch(e => console.log(e));
// configs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: true
}))
const requireLogin = (req,res,next) => {
    if(!req.session.user_id){
        return res.redirect('/login')
    }
    next();
}
// routes
app.get('/', (req, res) => {
    res.send('home page')
})
app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async(req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username, 
        password: hashedPassword
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})
//
app.get('/login', (req, res) => {
    res.render('login');
}) 
app.post('/login', async(req,res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword){
        req.session.user_id = user._id;
        res.send('Yay, welcome')
    }else{
        res.send('try again')
    }
})
// 
app.get('/secret',requireLogin, (req, res) => {
    res.render('secret')
})
// 
app.post('/logout', (req, res) => {
    req.session.user_id = null;
    req.session.destroy();
    res.redirect('/login');
})
// serve app
app.listen(3000, () => console.log('listening on port 3000'));