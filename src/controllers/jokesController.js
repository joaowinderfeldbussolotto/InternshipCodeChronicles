const jokesService = require('../services/jokesService');

const getJoke = async (req, res) => {
  try {
    const joke = await jokesService.getJoke();
    res.status(200).json(joke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getJoke,
};
