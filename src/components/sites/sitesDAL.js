import Site from "./sitesModel";

export async function create(name, siteId, userId) {
  const site = await Site.create({ name, siteId, userId });

  return site;
}

export async function findAll() {
  const sites = await Site.findAll();

  return sites;
}

export async function destroy(id) {
  const site = await Site.destroy({
    where: {
      id
    }
  });

  return site;
}

export default {
  create,
  findAll,
  destroy
};
