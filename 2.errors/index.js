const express = require('express'),
app = express();
const AppError = require('./AppError');
// routes
app.get('/', (req, res) => {
    res.send('home page')
})
app.get('/error', (req,res) => {
   try{
       chicken.fly();
   } catch(e){
       throw new AppError('Chicken do not fly', 404)
   }
})
// error handling middleware
app.use((err,req,res,next) => {
    const {status = 500, message ="something went wrong"} = err;
    res.status(status).send(message);
})
// create listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))