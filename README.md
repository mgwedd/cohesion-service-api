# Cohesion Service API

This API enables building tenants to request service / maintenance from their building managers and gives building managers a tool for managing those service requests.

The API is deployed and available on the internet at [this URL](https://cohesion-service-api.herokuapp.com/)

## Routes

1. `GET /` renders the server index page
2. `GET /servicerequest` list all service requests
3. `POST /servicerequest` create a service request
4. `GET /servicerequest/:id` get a single service request
5. `PATCH /servicerequest/:id` update a service request
6. `DELETE /servicerequest/:id` delete a service request

See `src/models/maintenanceRequest.model.js` to explore the schema fields.

## Incomplete Work (for evaluation)

This server is a prototype and would need more work in order to be production-ready.

Search `TODO` in the codebase to see notes on code that I either marked for requiring more work to be production-grade, or for which I didn't have time in the 3 hour coding challenge.

Some specific notes:

1. The tests are minimal. I wrote only a sample of each kind of test (unit, integration) to show how tests should be written for this server, but I didn't have time to flesh them all out.
2. There is no user model or authentication or authorization, so this prototype of the server is open. It would require authentication (e.g. JWT) and RBAC authorization and a funcitonal user model in order to be secure and also to enable you to properly set the createdBy and lastModifiedBy fields on the service requests.
3. The `GET /servicerequest` endpoint should have pagination and query options in a production-ready server, since the number of service requests is unbounded. It should also have default filtering to exclude service requests that are `Complete`.
4. The routes need request validation instead of just depending on mongoose schema validation.

## Set up

1. Clone the server to your local machine
2. Run `yarn install`
3. Run `yarn start` (production mode) or `yarn run dev` (dev mode)

## Scripts

Run the server: `yarn start`

Run the server in dev mode: `yarn run dev`

Run tests: `yarn test` or `yarn run test:watch` to run the tests while you're developing

## Deploying

Run: `git push heroku master`
