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

    const message = {
      to: email,
      from: "notify@mail.analytics.com",
      subject: `Your Signup Code is ${id}`,
      text: `Copy and paste this temporary signup code: ${id}`
    };

    util.mail.send(message);

    return user.dataValues;
  },
  login: async args => {
    const { email, password } = args;
    const loginCode = await cache.get(`temporary-signup-code:${email}`);

    if (password === loginCode) {
      await usersDAL.updateByEmail(email, { isVerified: true });

      return await usersDAL.findByEmail(email);
    }
  }
};

export default rootValue;
