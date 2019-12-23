import mail from "@sendgrid/mail";

import { SENDGRID_API_KEY } from "../constants";

mail.setApiKey(SENDGRID_API_KEY);

function send(message) {
  mail.send(message);
}

export default {
  send
};
