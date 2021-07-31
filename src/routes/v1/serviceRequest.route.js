
const express = require('express')
const { maintenanceRequestController } = require('../../controllers')

const router = express.Router()

router
  .route('/')
  .get(maintenanceRequestController.listServiceRequests)
  .post(maintenanceRequestController.createServiceRequest)

router
  .route('/:id')
  .get(maintenanceRequestController.getServiceRequest)
  .patch(maintenanceRequestController.updateServiceRequest)
  .delete(maintenanceRequestController.deleteServiceRequest)

module.exports = router