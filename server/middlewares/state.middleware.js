import ResponseController from '@helpers/response';
import models from '@models';

const { State } = models;

const stateFinder = async (req, res, next) => {
  const { id } = req.params;
  let state;
  try {
    state = await State.findOne({ where: { id } });
    if (!state) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'State does not exist', err);
  }

  req.state = state;
  next();
};

export default stateFinder;
