import User from "./usersModel";

export async function create(email) {
  const user = await User.create({ email });

  return user;
}

export async function findAll() {
  const users = await User.findAll();

  return users;
}

export async function findByEmail(email) {
  const user = await User.findOne({
    where: {
      email
    }
  });

  return user;
}

export async function findById(id) {
  const user = await User.findOne({
    where: {
      id
    }
  });

  return user;
}

export async function updateByEmail(email, values) {
  const user = await User.update(
    { ...values },
    {
      where: {
        email
      }
    }
  );

  return user;
}

export async function updateById(id, values) {
  const user = await User.update(
    { ...values },
    {
      where: {
        id
      }
    }
  );

  return user;
}

export default {
  create,
  findAll,
  findByEmail,
  findById,
  updateByEmail,
  updateById
};
