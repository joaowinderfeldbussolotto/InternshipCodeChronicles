const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const path = require('path');
const Gif = require('./models/Gif');
const Comic = require('./models/Comic');
const PORT = 3000;
const app = express();
const config = require('./config');

// Configure handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Define routes
app.get('/api/comic', getComic);

app.get('/api/gifs', getGifs);

app.get('/', getIndex);

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Route handlers
function getComic(req, res) {
  const comicNumber = '';
  const url = `https://xkcd.com/${comicNumber}/info.0.json`;
  axios
    .get(url)
    .then(response => {
      res.json(response.data.img);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
}

async function getGifsTeste(comicTitle) {
    try {
      const giphyApiKey = config.giphyApiKey;
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=3&q=${comicTitle}`;
  
      const response = await axios.get(url);
      const gifData = response.data;
  
      const gifs = gifData.data.map(gif => {
        const { id, title } = gif;
        const url = gif.images.original.url;
        return new Gif(id, url, title);
      });
  
      return gifs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

function getGifs(req, res) {
  const giphyApiKey = config.giphyApiKey;
  const search = req.query.search || 'cats';

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=3&q=${search}`;
  axios
    .get(url)
    .then(response => {
      const gifData = response.data;
      if (gifData.data.length > 0) {
        const gifs = gifData.data.map(gif => {
          const { id, title } = gif;
          const url = gif.images.original.url;
          return new Gif(id, url, title);
        });
        res.status(200).json(gifs);
      } else {
        res.status(404).json({ message: 'No GIF found' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
}

async function getIndex(req, res) {
    try {
      const wcData = await getLastWComic();
      const comicTitle = wcData.title;
      const gifs = await getGifsTeste(comicTitle);
      res.render('index', { wcomic: wcData, gifs: gifs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
function getLastWComic() {
  return axios
    .get(`https://xkcd.com/info.0.json`)
    .then(response => {
      const { num, title, img, alt } = response.data;
      const comic = new Comic(num, img, title, alt);
      return comic;
    });
}
