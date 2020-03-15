import generateId from "./generateId";
import mail from "./mail";
import jwt from "./jwt";

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default {
  generateId,
  mail,
  jwt,
  getRandomInt
};
