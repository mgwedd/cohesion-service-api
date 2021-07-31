const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { maintenanceRequestService } = require('../services')

// Add filtering and pagination options here when the API needs to scale

const createMaintenanceRequest = catchAsync(async (req, res) => {
  const maintenanceRequest = await maintenanceRequestService.createMaintenanceRequest(req.body)
  res.status(httpStatus.CREATED).send(maintenanceRequest)
})

const listMaintenanceRequests = catchAsync(async (req, res) => {
  const maintenanceRequestsList = await maintenanceRequestService.listMaintenanceRequests()
  res.send(maintenanceRequestsList)
})

const getMaintenanceRequest = catchAsync(async (req, res) => {
  const maintenanceRequest = await maintenanceRequestService.getMaintenanceRequestById(req.params.id)
  if (!maintenanceRequest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service request not found')
  }
  res.send(maintenanceRequest)
})

const updateMaintenanceRequest = catchAsync(async (req, res) => {
  const updatedMaintenanceRequest = await maintenanceRequestService.updatedMaintenanceRequestById(req.params.id, req.body)
  res.send(updatedMaintenanceRequest)
})

const deleteMaintenanceRequest = catchAsync(async (req, res) => {
  await maintenanceRequestService.deleteMaintenanceRequestById(req.params.id)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  createMaintenanceRequest,
  listMaintenanceRequests,
  getMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
}
