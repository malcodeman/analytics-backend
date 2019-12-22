import User from "./usersModel";

export async function create(email) {
  const user = await User.create({ email });

  return user;
}

export async function findAll() {
  const users = await User.findAll();

  return users;
}
