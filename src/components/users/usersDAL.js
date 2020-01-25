import User from "./usersModel";

export async function create(email) {
  const user = await User.create({ email });

  return user;
}

export async function findAll() {
  const users = await User.find();

  return users;
}

export async function findByEmail(email) {
  const user = await User.findOne({ email });

  return user;
}

export async function findById(id) {
  const user = await User.findById(id);

  return user;
}

export async function updateByEmail(email, values) {
  const user = await User.findOneAndUpdate({ email }, { ...values });

  return user;
}

export async function updateById(id, values) {
  const user = await User.findByIdAndUpdate(id, { ...values });

  return user;
}

export async function addSite(id, name, siteId) {
  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: { sites: { name, siteId } }
    },
    { new: true }
  );
  const site = user.sites[user.sites.length - 1];

  return site;
}

export async function destroySite(id, siteId) {
  const user = await User.findByIdAndUpdate(id, {
    $pull: { sites: { siteId } }
  });

  return user;
}

export async function findMySites(id) {
  const user = await User.findById(id).select("sites");

  return user.sites;
}

export async function findSite(siteId) {
  const user = await User.findOne({ "sites.siteId": siteId }).select("sites");

  return user;
}

export default {
  create,
  findAll,
  findByEmail,
  findById,
  updateByEmail,
  updateById,
  findMySites,
  destroySite,
  addSite,
  findSite
};
