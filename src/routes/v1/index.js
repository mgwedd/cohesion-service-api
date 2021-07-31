const express = require('express')
const maintenanceRequestRoute = require('./maintenanceRequest.route')

const router = express.Router()

/**
 * Note on naming:
 * We use 'servicerequest' as the API resource path to satisfy requirements
 * but 'maintenanceRequest' throughout the code in order to avoid naming confusion
 * with the API's 'service' abstraction and the 'servicerequest' resources
 */
const routes = [
  {
    path: '/servicerequest',
    route: maintenanceRequestRoute,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router
