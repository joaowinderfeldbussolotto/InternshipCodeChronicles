const activityService = require('../services/activityService');

const getActivity = async (req, res) => {
  try {
    const activity = await activityService.getActivity();
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getActivity,
};
