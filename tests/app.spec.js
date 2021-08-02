/* eslint-disable no-undef */
const app = require('../src/app');

describe('Cohesion API index', () => {
  it("GET / responds with 200 and renders the server's index page", () => {
    return supertest(app)
      .get('/')
      .expect(
        200,
        '<html><head><title>The Service Request API</title></head><body><h2>The Service Request API</h2><p>Use the /servicerequest (GET/POST) and /servicerequest/:id (GET/PATCH/DELETE) resource paths to CRUD service requests.</p></body></html>'
      );
  });
});

describe('Service Request API Routes', () => {
  it('GET /servicerequest responds with 200 and returns a list service requests', () => {
    return supertest(app).get('/servicerequest').expect(200);
  });
});
