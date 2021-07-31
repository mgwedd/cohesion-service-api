
const express = require('express')
const { serviceRequestController } = require('../../controllers')

const router = express.Router()

router
  .route('/servicerequest')
  .get(serviceRequestController.listServiceRequests)
  .post(serviceRequestController.createServiceRequest)

router
  .route('servicerequest/:id')
  .get(serviceRequestController.getServiceRequest)
  .patch(serviceRequestController.updateServiceRequest)
  .delete(serviceRequestController.deleteServiceRequest)

module.exports = router