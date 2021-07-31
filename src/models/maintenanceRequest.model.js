const mongoose = require('mongoose')
const validator = require('validator')

const { toJSON } = require('./plugins')

// Map the MongoDB internal timestamping fields to externally available resource fields in the schema
const schemaOptions = {
  timestamps: {
    createdDate: 'created_at',
    lastModifiedDate: 'updated_at',
  },
}

const maintenanceRequestSchema = mongoose.Schema(
  {
    buildingCode: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    currentStatus: {
      type: String,
      required: true,
      trim: true,
      enum: [
        'NotApplicable',
        'Created',
        'InProgress',
        'Complete',
        'Canceled',
      ],
      default: 'Created',
    },
    // We use an email for createdBy and lastModifiedBy
    // instead of the full name in the requirments data model example
    // so that users can be notified via email upon request completion without extraneous schema fields
    createdBy: {
      type: String,
      trim: true,
      required : true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid user email')
        }
      },
    },
    createdDate: {
      type: String,
    },
    lastModifiedBy: {
      type: String,
      trim: true,
      required : true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid user email')
        }
      },
    },
    lastModifiedDate: {
      type: String,
    }
  },
  schemaOptions,
)

maintenanceRequestSchema.plugin(toJSON)

/**
 * @typedef MaintenanceRequest
 */
const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema)

module.exports = MaintenanceRequest
