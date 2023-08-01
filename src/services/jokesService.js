const axios = require('axios');
const Joke = require('./../models/Joke')

const getRandomJoke = async () => {
  const chuckNorrisApiUrl = 'https://api.chucknorris.io/jokes/random';
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
