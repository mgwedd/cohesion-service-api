const express = require('express');

const { maintenanceRequestController } = require('../../controllers');

const router = express.Router();

// TODO Add auth and validation middleware before moving to production

router
  .route('/')
  .get(maintenanceRequestController.listMaintenanceRequests)
  .post(maintenanceRequestController.createMaintenanceRequest);

router
  .route('/:id')
  .get(maintenanceRequestController.getMaintenanceRequest)
  .patch(maintenanceRequestController.updateMaintenanceRequest)
  .delete(maintenanceRequestController.deleteMaintenanceRequest);

module.exports = router;
