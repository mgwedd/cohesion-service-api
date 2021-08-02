const mongoose = require('mongoose');
const validator = require('validator');

const { toJSON } = require('./plugins');
const { logger } = require('../config');
const { sendEmail } = require('../services/email.service');

const schemaOptions = {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'lastModifiedDate',
  },
};

const maintenanceRequestSchema = mongoose.Schema(
  {
    buildingCode: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    currentStatus: {
      type: String,
      trim: true,
      enum: ['NotApplicable', 'Created', 'InProgress', 'Complete', 'Canceled'],
      default: 'Created',
    },
    // We use an email for createdBy and lastModifiedBy
    // instead of the full name in the requirments data model example
    // so that users can be notified via email upon request completion without extraneous schema fields

    // TODO the createdBy and lastModifiedBy fields should be computed based on authenticated user sessions,
    // drawing on a user model, in a production-ready version of this API.
    createdBy: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid user email');
        }
      },
    },
    lastModifiedBy: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid user email');
        }
      },
    },
  },
  schemaOptions
);

maintenanceRequestSchema.plugin(toJSON);

maintenanceRequestSchema.post('save', async (doc) => {
  // TODO add more logic here so that a user wouldn't get continually emailed
  // if the document is re-saved with a "Complete" status — for example,
  // only sending the email if the previous currentStatus was not Complete.
  // TODO abstract this business logic into its own module to avoid cluttering the model
  if (doc.currentStatus === 'Complete' && doc.createdBy) {
    logger.info(`${doc._id} sending email`);
    // notify the user that their service request was marked as "Complete"
    // TODO use the users and ticket owners names, not their emails, for ref in the email, drawing from some future user model
    const { createdBy: userEmail, lastModifiedBy: ticketOwnerEmail } = doc;
    const serviceRequestComplete = {
      to: userEmail,
      subject: 'Your Service Request Is Complete!',
      body: `Hello ${userEmail}!\n\nWe wanted to let you know that ${ticketOwnerEmail} successfully completed your service request.
      \n\nPlease reach out on the Service Request portal if you experience any other issues!\n\nWarmly,\nYour Home Team`,
    };
    // don't await the nodemailer promise so as not to hold up the model patch request
    sendEmail(serviceRequestComplete);
  }
});

/**
 * @typedef MaintenanceRequest
 */
const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

module.exports = MaintenanceRequest;
