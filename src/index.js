const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const path = require('path');

const app = express();
const config = require('./config');

// * ATENCAO *
// TODO: precisamos organizar a questao de uso de ; em finais de linha
// TODO: 

app.get('/api/comic', (req,res) => {
    let comicNumber = ''
    let url = `https://xkcd.com/${comicNumber}/info.0.json`
    axios.get(url)
    .then(response => {
        res.json(response.data.img)
    })
})

app.get('/api/gifs', (req, res) => {
    const giphyApiKey = config.giphyApiKey;
    const search = req.query.search || 'cats';

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=3&q=${search}`;
    axios
        .get(url)
        .then(response => {
            const gifData = response.data;
            if (gifData.data.length > 0) {
                const keys = Object.keys(gifData);
                console.log(keys); // Print the keys to the console
                res.json(gifData.data);
            } else {
                res.status(404).json({ message: 'No GIF found' });
            }
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        });
});

function getLastWComic() {
  return axios.get(`https://xkcd.com/info.0.json`)
    .then(comic=> comic.data);
}

app.get('/', (req, res) => {
  getLastWComic().then(wcData => {
    res.render('index',  // index esta no /layout/index.handlebars
      {wcomic: wcData});
  });
});

// handlebars
app.set('views', path.join(__dirname, 'views')); // onde estao as views
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'})); // arquivo principal de layout
app.set('view engine', 'handlebars'); // qual a view engine

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
