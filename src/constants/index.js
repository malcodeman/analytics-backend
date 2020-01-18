const {
  NODE_ENV,
  PORT,
  SENDGRID_API_KEY,
  PRIVATE_KEY,
  MONGODB_URI
} = process.env;
const EXPIRES_IN = "30 days";

export default {
  NODE_ENV,
  PORT,
  SENDGRID_API_KEY,
  PRIVATE_KEY,
  EXPIRES_IN,
  MONGODB_URI
};
