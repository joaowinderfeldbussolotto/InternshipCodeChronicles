const axios = require('axios');
// const Quote = require('../models/Quote');

const maxId = 402;

async function getQuoteById(id) {
    try {
        const reqConfig = {
            data: {
                id: assureValidId(id)
            }
        }
        return axios
        .get('https://stoic-api.vercel.app/api/quote', reqConfig)
        .then(response => {
            return response.data
            // return retrieveData(response.data);
    });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Creates a Quote object from the retrieved data.
 */
function retrieveData (data) {
    const { id, author, quote, source } = data;
    const quoteData = new Quote(id, author, quote, source);
    return quoteData;
}

/**
 * Retrieves a random Quote
 */
async function getRandomQuote() {
    try {
        const randomId = Math.floor(Math.random() * maxId) + 1;
        return getQuoteById(randomId);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Calculates the Quote ID based on the last Quote and the current Quote.
 */
function assureValidId(id) {
    return id%(maxId+1);
}

console.log('By id ' + getQuoteById(403))
console.log(`random ${getRandomQuote()}`)

module.exports = { getRandomQuote, getQuoteById };