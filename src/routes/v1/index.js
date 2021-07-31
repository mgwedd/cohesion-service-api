const express = require('express')
const serviceRequestRoute = require('./serviceRequest.route')

const router = express.Router()

const routes = [
  {
    path: '/servicerequest',
    route: serviceRequestRoute,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router
