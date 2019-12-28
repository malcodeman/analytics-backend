import Site from "./sitesModel";

export async function create(name, userId) {
  const site = await Site.create({ name, userId });

  return site;
}

export async function findAll() {
  const sites = await Site.findAll();

  return sites;
}

export default {
  create,
  findAll
};
