const express = require('express');
const maintenanceRequestRoute = require('./maintenanceRequest.route');
const indexRoute = require('./default.route');

const router = express.Router();

/**
 * Note on naming:
 * We use 'servicerequest' as the API resource path to satisfy requirements
 * but 'maintenanceRequest' throughout the code in order to avoid naming confusion
 * with the API's 'service' abstraction and the 'servicerequest' resources
 *
 * Note on basic routes:
 * For productionizing the server, we should add healthcheck, monitoring, docs, etc routes to this API
 */
const routes = [
  {
    path: '/',
    route: indexRoute,
  },
  {
    path: '/servicerequest',
    route: maintenanceRequestRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
