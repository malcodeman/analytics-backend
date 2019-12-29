import sitesDAL from "./sitesDAL";
import util from "../../util";

async function addSite(name, userId) {
  const siteId = await util.generateId();

  return await sitesDAL.create(name, siteId, userId);
}

export default {
  addSite
};
