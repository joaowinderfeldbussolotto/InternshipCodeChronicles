const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;
const Gif = require('./models/Gif');
const Comic = require('./models/Comic');

const wcomic = require('./routes/xkcd');
//const giphy = require('./routes/gifs');

// Configure handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Define routes

// Redirect the root route to the '/comic' route
app.get('/', (req, res) => res.redirect('/comic'));

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Route handlers
app.use('/comic', wcomic.router);