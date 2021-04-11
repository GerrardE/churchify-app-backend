import { v4 } from 'uuid';
import randString from '@helpers/utilities';
import ResponseController from '@helpers/response';
import models from '@models';

const { State, ApiLogs } = models;

const stateFinder = async (req, res, next) => {
  const { id } = req.params;
  let state;
  try {
    state = await State.findOne({ where: { id } });
    if (!state) throw new Error();
  } catch (err) {
    const apilog = {
      name: 'stateFinder',
      refid: randString('STATE'),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: 'State does not exist',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, 'State does not exist', err);
  }

  req.state = state;
  next();
};

export default stateFinder;
