const { DB_NAME, DB_USER, DB_PASSWORD, NODE_ENV, PORT } = process.env;

export const DB = {
  NAME: DB_NAME,
  USER: DB_USER,
  PASSWORD: DB_PASSWORD
};

export { NODE_ENV, PORT };
