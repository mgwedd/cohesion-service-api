const faker = require('faker');

const { MaintenanceRequest } = require('../../../src/models');

describe('MaintenanceRequest model', () => {
  describe('MaintenanceRequest validation', () => {
    let newMaintenanceRequest;
    beforeEach(() => {
      newMaintenanceRequest = {
        buildingCode: faker.address.stateAbbr(),
        description: faker.lorem.sentence(),
        createdBy: faker.internet.email().toLowerCase(),
        lastModifiedBy: faker.internet.email().toLowerCase(),
      };
    });

    test('should correctly validate a valid maintenance request', async () => {
      await expect(new MaintenanceRequest(newMaintenanceRequest).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if createdBy is not a valid email', async () => {
      newMaintenanceRequest.createdBy = 'not_an_email@';
      await expect(new MaintenanceRequest(newMaintenanceRequest).validate()).rejects.toThrow();
    });

    // TODO add more tests with invalid data to ensure proper handling
  });
});
