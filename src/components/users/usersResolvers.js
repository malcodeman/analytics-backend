import usersDAL from "./usersDAL";

async function findAllUsers() {
  const users = await usersDAL.findAll();

  return users;
}

export default {
  findAllUsers
};
