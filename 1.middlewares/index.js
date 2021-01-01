const express = require('express'),
	app = express(),
	morgan = require('morgan');

// middlewares
app.use(morgan('dev'));
app.use((req, res, next) => {
	console.log('middlware is called first');
	next();
});

// create routes
app.get('/', (req, res) => {
	res.send('home page');
});

// create a listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
