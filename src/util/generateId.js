import nanoid from "nanoid/async";

async function generateId(size) {
  return nanoid(size);
}

export default generateId;
