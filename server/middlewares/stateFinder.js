import models from '@models';

const { State } = models;

const stateFinder = async (req, res, next) => {
  const { id } = req.params;
  Number(id);
  const state = await State.findOne({ where: { id } });

  if (!state) {
    return res.status(400).json({
      status: 404,
      errors: 'State does not exist'
    });
  }
  req.state = state;
  next();
};

export default stateFinder;
