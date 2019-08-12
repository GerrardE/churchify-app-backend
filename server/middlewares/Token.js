import jwt from 'jsonwebtoken';

export const createToken = (payload => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' }));

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return res.status(403).json({
      status: 403,
      message: 'No token supplied'
    });
  }

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid token supplied'
        });
      }

      req.decoded = decoded;
      return next();
    });
  }
};
