import jwt from "jsonwebtoken";

import usersDAL from "../users/usersDAL";
import util from "../../util";
import cache from "../../cache";
import { PRIVATE_KEY, EXPIRES_IN } from "../../constants";

async function sendSignupCode(email) {
  const signupCode = await util.generateId();

  await cache.set(`temporary-signup-code:${email}`, signupCode);

  const message = {
    to: email,
    from: "notify@mail.analytics.com",
    subject: `Your Signup Code is ${signupCode}`,
    text: `Copy and paste this temporary signup code: ${signupCode}`
  };

  util.mail.send(message);
}

async function signup(email) {
  const user = await usersDAL.findByEmail(email);

  if (user) {
    sendSignupCode(user.email);

    return user;
  }

  const newUser = await usersDAL.create(email);

  sendSignupCode(newUser.email);

  return newUser;
}

async function login(email, password) {
  const loginCode = await cache.get(`temporary-signup-code:${email}`);

  if (password === loginCode) {
    await usersDAL.updateByEmail(email, { isVerified: true });

    const user = await usersDAL.findByEmail(email);
    const payload = { id: user.id };
    const token = util.jwt.sign(payload);
    const response = {
      user,
      token
    };

    return response;
  }
}

export default {
  signup,
  login
};
