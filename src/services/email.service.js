const nodemailer = require('nodemailer');

const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);

if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async ({ to, subject, body }) => {
  const msg = { from: config.email.from, to, subject, text: body };
  await transport.sendMail(msg);
};

module.exports = {
  transport,
  sendEmail,
};
