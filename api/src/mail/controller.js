const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "mail.infomaniak.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
});

const mailController = {
  async sendMail(req, res) {
    const { from, to, subject, text, html } = req.body;
    if (!to || !subject) {
      return res.status(400).json({ error: "Paramètres manquants." });
    }
    try {
      const sendEmail = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
      });

      return res.status(201).json({ message: "Email envoyé.", sendEmail });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return res.status(500).json({ error: "Échec de l'envoi de l'email." });
    }
  },
  async sendEmailFromBackend(datas, res) {
    const { from, to, subject, text, html } = datas;
    if (!to || !subject) {
      return res.status(400).json({ error: "Paramètres manquants." });
    }
    try {
      const sendEmail = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
      });
      //console.log(sendEmail);

      return { message: "Email envoyé." };
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return res.status(500).json({ error: "Échec de l'envoi de l'email." });
    }
  },
};

module.exports = mailController;
