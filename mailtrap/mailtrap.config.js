const { MailtrapClient } = require("mailtrap");

const TOKEN = "a30369e5864a591dc78b7189320bd956";

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "mailtrap@satraders.co",
  name: "Mailtrap Test",
};


module.exports = {client , sender}


