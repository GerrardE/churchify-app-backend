import ResponseController from "@helpers/response";
import jwt from "jsonwebtoken";

export const createToken = (payload) => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return ResponseController.error(res, 403, 403, "No token supplied", {});
  }

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return ResponseController.error(res, 401, 401, "Invalid token supplied", err);
      }

      req.decoded = decoded;
      return next();
    });
  }
};

// bearer token issues solved: 20/July/2025
// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization || req.body.token;

//   if (!authHeader) {
//     return ResponseController.error(res, 403, 403, "No token supplied", {});
//   }

//   // Extract the token from 'Bearer <token>'
//   const token = authHeader.startsWith('Bearer ')
//     ? authHeader.split(' ')[1]
//     : authHeader;

//   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) {
//       console.log(err, ">>>>>>>>><<<<<<<<<<");
//       return ResponseController.error(res, 401, 401, "Invalid token supplied", err);
//     }

//     req.decoded = decoded;
//     return next();
//   });
// };
