
const express = require('express')
const validate = require('../../middleware/validate')
const serviceRequestValidation = require('../../validations/serviceRequest.validation')
const serviceRequestController = require('../../controllers/serviceRequest.controller')

const router = express.Router()

router
  .route('/servicerequest')
  .get(validate(serviceRequestValidation.listServiceRequests), serviceRequestController.listServiceRequests)
  .post(validate(serviceRequestValidation.createServiceRequest), serviceRequestController.createServiceRequest)

router
  .route('servicerequest/:id')
  .get(validate(serviceRequestValidation.getServiceRequest), serviceRequestController.getServiceRequest)
  .patch(validate(serviceRequestValidation.updateServiceRequest), serviceRequestController.updateServiceRequest)
  .delete(validate(serviceRequestValidation.deleteServiceRequest), serviceRequestController.deleteServiceRequest)

module.exports = router