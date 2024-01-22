// @ts-check
const { test, expect } = require('@playwright/test');
const PwHelpers = require('./pw-helpers');

test('retrieve state residents', async ({ request }) => {
  const createResidentBody = await PwHelpers.createDefaultResident(request);

  await PwHelpers.createDefaultResidentWithStateId(request, createResidentBody.stateId);

  await PwHelpers.createDefaultResident(request);

  const response = await request.get(`/api/states/${createResidentBody.stateId}/residents`);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.length).toBe(2);

  const allResidentsResponse = await request.get('/api/residents');
  const allResidentsBody = await allResidentsResponse.json();

  expect(allResidentsBody.length).toBeGreaterThan(2);
});
