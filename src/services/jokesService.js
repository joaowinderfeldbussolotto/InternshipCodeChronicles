const axios = require('axios');
const Joke = require('./../models/Joke')
const config = require('../config'); 

const getRandomJoke = async () => {
  const chuckNorrisApiUrl = config.chuckNorrisApiUrl;
  const response = await axios.get(chuckNorrisApiUrl);
  return response.data;
};

const getJoke = async () => {
  const jokeData = await getRandomJoke();
  return new Joke(jokeData);
};

module.exports = {
  getJoke,
};
