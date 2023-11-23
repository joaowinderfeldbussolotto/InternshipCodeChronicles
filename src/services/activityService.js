const axios = require('axios');
const Activity = require('./../models/Activity')
const config = require('../config'); 

const getRandomActivity = async () => {
  const boredApiUrl = config.boredApiUrl;
  const response = await axios.get(boredApiUrl);
  return response.data;
};

const getActivity = async () => {
  const activityData = await getRandomActivity();
  return Activity.fromJSON(activityData);
};

module.exports = {
  getActivity,
};
