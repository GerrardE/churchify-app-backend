const trim = (req, res, next) => {
  const keysArr = Object.keys(req.body);

  req.body = keysArr.reduce((obj, key) => {
    // eslint-disable-next-line no-param-reassign
    obj[key] = typeof req.body[key] === 'string'
      ? req.body[key].replace(/ +/g, ' ').trim() : req.body[key];

    return obj;
  }, {});

  next();
};

export default trim;
