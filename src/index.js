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

app.get('/', (req, res) => res.redirect('/comic'))
app.get('/comic', getIndex);

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Route handlers

async function getGifs(comicTitle, limit = 2) {
    try {
      const giphyApiKey = config.giphyApiKey;
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=${limit}&q=${comicTitle}`;
  
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

 

async function getIndex(req, res) {
  try {
      let current = parseInt(req.query.curr);
      const wcData = await getWComic(current);
      const comicTitle = wcData.title;
      const gifs = await getGifs(comicTitle);
      //res.render('index', { wcomic: wcData, gifs: gifs, prev: wcData.id -1, next: wcData.id+1});
      res.render('index', { wcomic: wcData, gifs: gifs});

    } catch (error) {
      res.json(error)
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

function getComicId(lastComic, comic){
  if (!comic) 
    return Math.floor(Math.random() * lastComic) + 1;
  if (comic > lastComic) 
    return comic - lastComic;
  return comic;
}

function getWComic(comicId) {
  
	return axios
    .get(`https://xkcd.com/info.0.json`)
    .then(response => {
      const { num, title, img, alt } = response.data;
      const comic = new Comic(num, img, title, alt);
      comicId = getComicId(comic.id, comicId);
        return axios.get(`https://xkcd.com/${comicId}/info.0.json`)
        .then(response => {
        const { num, img, title, alt } = response.data;
        const rComic = new Comic (num, img, title, alt);
        return rComic;
        });
    });
}
  
