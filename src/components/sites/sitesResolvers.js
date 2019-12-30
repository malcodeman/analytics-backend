import sitesDAL from "./sitesDAL";
import util from "../../util";

async function addSite(name, userId) {
  const siteId = await util.generateId();

  return await sitesDAL.create(name, siteId, userId);
}

async function destroySite(siteId) {
  return await sitesDAL.destroy(siteId);
}

export default {
  addSite,
  destroySite
};
