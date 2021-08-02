const httpStatus = require('http-status');

const { MaintenanceRequest } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a maintenance request
 * @param {Object} maintenanceRequestBody
 * @returns {Promise<MaintenanceRequest>}
 */
const createMaintenanceRequest = async (maintenanceRequestBody) => {
  return MaintenanceRequest.create(maintenanceRequestBody);
};

/**
 * List maintenance requests
 * @returns {Promise<QueryResult>}
 */
const listMaintenanceRequests = async () => {
  const maintenanceRequests = await MaintenanceRequest.find();
  return maintenanceRequests;
};

/**
 * Get maintenance request by id
 * @param {ObjectId} id
 * @returns {Promise<MaintenanceRequest>}
 */
const getMaintenanceRequestById = async (id) => {
  return MaintenanceRequest.findById(id);
};

/**
 * Update maintenance request by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<MaintenanceRequest>}
 */
const updateMaintenanceRequestById = async (id, updateBody) => {
  const maintenanceRequest = await getMaintenanceRequestById(id);
  if (!maintenanceRequest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service request not found');
  }
  Object.assign(maintenanceRequest, updateBody);
  await maintenanceRequest.save();
  return maintenanceRequest;
};

/**
 * Delete maintenance request by id
 * @param {ObjectId} id
 * @returns {Promise<MaintenanceRequest>}
 */
const deleteMaintenanceRequestById = async (id) => {
  const maintenanceRequest = await getMaintenanceRequestById(id);
  if (!maintenanceRequest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service request not found');
  }
  await maintenanceRequest.remove();
  return maintenanceRequest;
};

module.exports = {
  createMaintenanceRequest,
  listMaintenanceRequests,
  getMaintenanceRequestById,
  updateMaintenanceRequestById,
  deleteMaintenanceRequestById,
};
