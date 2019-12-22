import { create, findAll } from "../components/users/usersDAL";

const rootValue = {
  findAllUsers: async () => {
    const users = await findAll();

    return users;
  },
  signup: async args => {
    const { email } = args;
    const user = await create(email);

    return user.dataValues;
  }
};

export default rootValue;
