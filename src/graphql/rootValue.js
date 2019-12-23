import usersDAL from "../components/users/usersDAL";
import cache from "../cache";
import util from "../util";

const rootValue = {
  findAllUsers: async () => {
    const users = await usersDAL.findAll();

    return users;
  },
  signup: async args => {
    const { email } = args;
    const user = await usersDAL.create(email);
    const id = await util.generateId();

    await cache.set(`temporary-signup-code:${user.dataValues.email}`, id);

    return user.dataValues;
  },
  login: async args => {
    const { email, password } = args;
    const loginCode = await cache.get(`temporary-signup-code:${email}`);

    if (password === loginCode) {
      return await usersDAL.findByEmail(email);
    }
  }
};

export default rootValue;
