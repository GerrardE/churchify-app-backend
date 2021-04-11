import { v4 } from 'uuid';
import randString from '@helpers/utilities';
import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';
import { userFindAll } from './user.middleware';

const { Download, ApiLogs } = models;

const downloadFinder = async (req, res, next) => {
  const { id } = req.params;
  let download;
  try {
    download = await Download.findOne({ where: { id } });
    if (!download) throw new Error();
  } catch (err) {
    const apilog = {
      name: 'downloadFinder',
      refid: randString('DOWNLOAD'),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: 'Download does not exist',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, 'Download does not exist', err);
  }

  req.download = download;
  next();
};

const downloadPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, 'download');
  } catch (err) {
    const apilog = {
      name: 'downloadPermission',
      refid: randString('DOWNLOAD'),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 403,
      statuscode: 403,
      message: 'You do not have enough permissions',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { downloadFinder, downloadPermission };
