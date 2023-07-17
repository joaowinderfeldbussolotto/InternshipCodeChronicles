const axios = require('axios');
const Comic = require('../models/Comic');

async function getMaxComicId() {
    let comic = await getLastComic();
    return comic.id;
}

function retrieveData (data) {
    const { num, title, img, alt } = data;
    const comic = new Comic(num, img, title, alt);
    return comic;
}

async function getLastComic() {
    try {
        return axios
        .get(`https://xkcd.com/info.0.json`)
        .then(response => {
        return retrieveData(response.data);
    });
    } catch (error) {
        console.error(error);
    }
}

async function getRandomComic() {
    try {
        const maxLimitId = await getMaxComicId();
        const randomId = Math.floor(Math.random() * maxLimitId) + 1;
        
        return axios
            .get(`https://xkcd.com/${randomId}/info.0.json`)
            .then(response => {
                return retrieveData(response.data);
            });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Calculates the comic ID based on the last comic and the current comic.
 * @param {number} max - The ID of the last comic available.
 * @param {number} id - The ID of the current comic.
 * @returns {number} The calculated comic ID.
 */
function assureValidId(max, id) {
    if (!id) 
      id = Math.floor(Math.random() * max) + 1;
    else if (id > max || id < 1) 
      id = 0;
    return id;
}

/**
 * Retrieves the comic data for the index page.
 * @param {number} id - The ID of the comic. If not provided, a random comic will be fetched.
 * @returns {Comic} The Comic object representing the fetched comic.
 */
async function getComicById(id) {
    try {
        const maxLimitId = await getMaxComicId();
        id = assureValidId(maxLimitId, id);
        if (id == 0) return false;
        return axios
            .get(`https://xkcd.com/${id}/info.0.json`)
            .then(response => {
                return retrieveData(response.data);
            });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getRandomComic, getComicById, getLastComic };