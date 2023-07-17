const express = require('express');
const router = express.Router();
const xkcdController = require('../controllers/xkcdController');
const giphyController = require('../controllers/giphyController');

router.get('/', async (req, res) => {
    comicData = await xkcdController.getRandomComic();
    giphyData = await giphyController.getGifs(comicData.title);
    res.render('index', { wcomic: comicData, gifs: giphyData });
});

router.get('/id/:id', async (req, res) => {
    comicData = await xkcdController.getComicById(req.params.id);
    if (comicData) { // se id_escolhido > max_id : manda pra rota random 
        giphyData = await giphyController.getGifs(comicData.title);
        res.render('index', { wcomic: comicData, gifs: giphyData });
    } else {
        res.redirect('/');
    }
});

router.get('/last', async (req, res) => {
    comicData = await xkcdController.getLastComic();
    giphyData = await giphyController.getGifs(comicData.title);
    res.render('index', { wcomic: comicData, gifs: giphyData });
});


module.exports = {router};