import mail from "@sendgrid/mail";

import constants from "../constants";

mail.setApiKey(constants.SENDGRID_API_KEY);

function send(message) {
  mail.send(message);
}

export default {
  send
};
