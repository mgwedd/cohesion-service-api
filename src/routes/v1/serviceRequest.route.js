
const express = require('express')
const { serviceRequestController } = require('../../controllers')

const router = express.Router()

router
  .route('/')
  .get(serviceRequestController.listServiceRequests)
  .post(serviceRequestController.createServiceRequest)

router
  .route('/:id')
  .get(serviceRequestController.getServiceRequest)
  .patch(serviceRequestController.updateServiceRequest)
  .delete(serviceRequestController.deleteServiceRequest)

module.exports = router