import jsonwebtoken from "jsonwebtoken";

import { PRIVATE_KEY, EXPIRES_IN } from "../constants";

function sign(payload) {
  const token = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn: EXPIRES_IN
  });

  return token;
}

function verify(token) {
  const decoded = jwt.verify(token, PRIVATE_KEY);

  return decoded;
}

export default {
  sign,
  verify
};
