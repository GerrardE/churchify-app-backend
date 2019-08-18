import models from '@models';

const { Download } = models;

const downloadFinder = async (req, res, next) => {
  const { id } = req.params;
  const download = await Download.findOne({ where: { id } });

  if (!download) {
    return res.status(400).json({
      status: 404,
      errors: 'download does not exist'
    });
  }
  req.download = download;
  next();
};

const downloadPermission = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const download = await Download.findOne({ where: { id, userId } });

  if (!download) {
    return res.status(400).json({
      status: 403,
      errors: 'You do not have enough permissions'
    });
  }

  req.download = download;
  next();
};

export { downloadFinder, downloadPermission };
