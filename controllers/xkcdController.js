const axios = require('axios');
const Comic = require('../models/Comic');

const giphyController = require('./giphyController');

/**
* Retrieves the index page with the comic data and related GIFs.
* @param {Object} req - The request object.
* @param {Object} res - The response object.
*/
async function getIndex(req, res) {
    try {
        let current = parseInt(req.query.curr);
        const wcData = await getWComic(current);
        const comicTitle = wcData.title;
        const gifs = await giphyController.getGifs(comicTitle);
        res.render('index', { wcomic: wcData, gifs: gifs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Calculates the comic ID based on the last comic and the current comic.
 * @param {number} lastComic - The ID of the last comic available.
 * @param {number} comic - The ID of the current comic.
 * @returns {number} The calculated comic ID.
 */
function getComicId(lastComic, comic) {
    if (!comic) 
      return Math.floor(Math.random() * lastComic) + 1;
    if (comic > lastComic) 
      return comic - lastComic;
    return comic;
}

/**
 * Retrieves the comic data for the index page.
 * @param {number} comicId - The ID of the comic. If not provided, a random comic will be fetched.
 * @returns {Comic} The Comic object representing the fetched comic.
 */
async function getWComic(comicId) {
    try {
        return axios
        .get(`https://xkcd.com/info.0.json`)
        .then(response => {
        const { num, title, img, alt } = response.data;
        const comic = new Comic(num, img, title, alt);
        comicId = getComicId(comic.id, comicId);
        return axios.get(`https://xkcd.com/${comicId}/info.0.json`)
            .then(response => {
            const { num, img, title, alt } = response.data;
            const rComic = new Comic(num, img, title, alt);
            return rComic;
            });
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {getIndex};