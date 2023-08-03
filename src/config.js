require('dotenv').config();

const PORT = process.env.PORT || 8080;
const CHUCKNORRIS_API_URL = process.env.CHUCKNORRIS_API_URL;
const BORED_API_URL  = process.env.BORED_API_URL;

const config = {
  port: PORT,
  chuckNorrisApiUrl: CHUCKNORRIS_API_URL,
  boredApiUrl: BORED_API_URL,
};

module.exports = config;
