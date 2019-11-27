const moviesDelegate = require(__base + '/delegates/movies');

const createMovies = async (req, res) => {
  try {
    let movie = await moviesDelegate.create(req.body);
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getMovies = async (req, res) => {
  try {
    let movies = await moviesDelegate.getAll();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getMovie = async (req, res) => {
  try {
    const { id } = req.params;
    let movie = await moviesDelegate.getById(parseInt(id));
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.register = app => {
  app.post('/movies', createMovies);
  app.get('/movies', getMovies);
  app.get('/movies/:id', getMovie);
};
