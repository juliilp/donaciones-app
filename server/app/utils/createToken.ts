import jwt from "jsonwebtoken";

const createToken = (idUser: Object) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      idUser,
      "token123",
      {
        expiresIn: 60 * 60,
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      }
    );
  });
};

export default createToken;
