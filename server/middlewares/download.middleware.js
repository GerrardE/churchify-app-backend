import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';
import { userFindAll } from './user.middleware';

const { Download } = models;

const downloadFinder = async (req, res, next) => {
  const { id } = req.params;
  let download;
  try {
    download = await Download.findOne({ where: { id } });
    if (!download) throw new Error();
  } catch (err) {
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
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { downloadFinder, downloadPermission };
