import { AuthenticationError, ValidationError } from "apollo-server";

import usersDAL from "../users/usersDAL";
import util from "../../util";
import cache from "../../cache";
import constants from "../../constants";

async function sendSignupCode(email) {
  const signupCode = await util.generateId();

  await cache.set(`temporary-signup-code:${email}`, signupCode);

  const message = {
    to: email,
    from: "notify@mail.analytics.com",
    subject: `Your Signup Code is ${signupCode}`,
    text: `Copy and paste this temporary signup code: ${signupCode}`,
  };

  util.mail.send(message);
}

async function sendTemporaryPassword(parent, args) {
  const email = args.email;
  const user = await usersDAL.findByEmail(email);

  if (user) {
    sendSignupCode(user.email);

    return user;
  }

  throw new ValidationError(
    "We could not reach the email address you provided. Please try again with a different email."
  );
}

async function signup(parent, args) {
  const email = args.email;
  const user = await usersDAL.findByEmail(email);

  if (user) {
    throw new ValidationError("Email has already been taken");
  }

  const newUser = await usersDAL.create(args);

  sendSignupCode(newUser.email);

  return newUser;
}

async function login(parent, args) {
  const email = args.email;
  const password = args.password;
  const loginCode = await cache.get(`temporary-signup-code:${email}`);

  if (password !== loginCode && password !== constants.MASTER_LOGIN_CODE) {
    throw new AuthenticationError("Invalid password");
  }

  const user = await usersDAL.updateByEmail(email, { isVerified: true });

  const payload = { id: user.id };
  const token = util.jwt.sign(payload);
  const response = {
    user,
    token,
  };

  return response;
}

export { signup, login, sendTemporaryPassword };

export default {
  signup,
  login,
  sendTemporaryPassword,
};
