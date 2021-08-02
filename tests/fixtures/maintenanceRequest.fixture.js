const mongoose = require('mongoose');
const faker = require('faker');

const MaintenanceRequest = require('../../src/models/maintenanceRequest.model');

const maintenanceRequestOne = {
  _id: mongoose.Types.ObjectId(),
  buildingCode: faker.address.stateAbbr(),
  description: faker.lorem.sentence(),
  createdBy: faker.internet.email().toLowerCase(),
  lastModifiedBy: faker.internet.email().toLowerCase(),
};

const maintenanceRequestTwo = {
  _id: mongoose.Types.ObjectId(),
  buildingCode: faker.address.stateAbbr(),
  description: faker.lorem.sentence(),
  createdBy: faker.internet.email().toLowerCase(),
  lastModifiedBy: faker.internet.email().toLowerCase(),
};

const insertMaintenanceRequests = async (maintenanceRequests) => {
  await MaintenanceRequest.insertMany(maintenanceRequests);
};

module.exports = {
  maintenanceRequestOne,
  maintenanceRequestTwo,
  insertMaintenanceRequests,
};
