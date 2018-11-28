const starsDelegate = require(__base + '/delegates/stars');

const createStars = async (req, res) => {
  try {
    let star = await starsDelegate.create(req.body);
    res.json(star);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getStars = async (req, res) => {
  try {
    let stars = await starsDelegate.getAll();
    res.json(stars);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getStar = async (req, res) => {
  try {
    const { id } = req.params;
    let star = await starsDelegate.getById(id);
    res.json(star);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.register = app => {
  app.post('/stars', createStars);
  app.get('/stars', getStars);
  app.get('/stars/:id', getStar);
};
