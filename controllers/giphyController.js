const axios = require('axios');
const Gif = require('../models/Gif');
const config = require('../config');

/**
 * Retrieves GIFs related to the given comic title.
 * @param {string} comicTitle - The title of the comic.
 * @param {number} limit - The maximum number of GIFs to retrieve. Default is 2.
 * @returns {Array} An array of Gif objects.
 */
async function getGifs(comicTitle, limit = 2) {
    try {
        const giphyApiKey = config.giphyApiKey;
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=${limit}&q=${comicTitle}`;

        const response = await axios.get(url);
        const gifData = response.data;

        const gifs = gifData.data.map(gif => {
        const { id, title } = gif;
        const url = gif.images.downsized.url;
        return new Gif(id, url, title);
        });
        return gifs;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports = {getGifs};