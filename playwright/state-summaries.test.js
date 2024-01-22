// @ts-check
const { test, expect } = require('@playwright/test');
const PwHelpers = require('./pw-helpers');

test('retrieve state summaries', async ({ request }) => {
  const createUserBody = await PwHelpers.createDefaultUser(request);

  await PwHelpers.createDefaultUserWithStateId(request, createUserBody.stateId);

  await PwHelpers.createDefaultUser(request);

  const stateSummaryResponse = await request.get('/api/states/summary');

  expect(stateSummaryResponse.ok()).toBeTruthy();

  const body = await stateSummaryResponse.json();

  expect(body.length).toBeGreaterThanOrEqual(2);
});

test('retrieve state summary', async ({ request }) => {
  const createUserBody = await PwHelpers.createDefaultUser(request);

  const stateId = createUserBody.stateId;

  await PwHelpers.createDefaultUserWithStateId(request, stateId);

  await PwHelpers.createDefaultUser(request);

  const stateSummaryResponse = await request.get(`/api/states/${stateId}/summary`);

  expect(stateSummaryResponse.ok()).toBeTruthy();

  const stateSummaryBody = await stateSummaryResponse.json();
  expect(stateSummaryBody.id).toBe(stateId);
  expect(stateSummaryBody.name).toBe('Nebraska');
  expect(stateSummaryBody.symbol).toBe('NE');
  expect(stateSummaryBody.population).toBe(2);
  expect(parseInt(stateSummaryBody.avgAge)).toBe(35);
  expect(parseInt(stateSummaryBody.avgWeight)).toBe(150);
  expect(parseInt(stateSummaryBody.avgIncome)).toBe(45000);
});
