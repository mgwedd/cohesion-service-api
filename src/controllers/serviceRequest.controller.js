const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { maintenanceService } = require('../services')

const createServiceRequest = catchAsync(async (req, res) => {
  const serviceRequest = await maintenanceService.createUser(req.body)
  res.status(httpStatus.CREATED).send(serviceRequest)
})

const listServiceRequests = catchAsync(async (req, res) => {
  const serviceRequestsList = await maintenanceService.queryUsers()
  res.send(serviceRequestsList)
})

const getServiceRequest = catchAsync(async (req, res) => {
  const serviceRequest = await maintenanceService.getServiceRequestById(req.params.id)
  if (!serviceRequest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'service request not found')
  }
  res.send(serviceRequest)
})

const updateServiceRequest = catchAsync(async (req, res) => {
  const updatedServiceRequest = await maintenanceService.updateUserById(req.params.id, req.body)
  res.send(updatedServiceRequest)
})

const deleteServiceRequest = catchAsync(async (req, res) => {
  await maintenanceService.deleteServiceRequestById(req.params.id)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  createServiceRequest,
  listServiceRequests,
  getServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
}
