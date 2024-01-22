// @ts-check
const { test, expect } = require('@playwright/test');
const PwHelpers = require('./pw-helpers');

test('retrieve states', async ({ request }) => {
  const response = await request.get('/api/states');

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.length).toBeGreaterThanOrEqual(0);
});

test('create state', async ({ request }) => {
  const response = await request.post('/api/states', {
    data: {
      name: 'Nebraska',
      symbol: 'NE',
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.id).toBeGreaterThanOrEqual(0);
});

test('retrieve state', async ({ request }) => {
  const createStateBody = await PwHelpers.createDefaultState(request);

  const newStateId = createStateBody.id;

  // Retrieve State
  const getStateResponse = await request.get(`/api/states/${newStateId}`);

  expect(getStateResponse.ok()).toBeTruthy();

  const getStateBody = await getStateResponse.json();
  expect(getStateBody.id).toBe(newStateId);
});

test('update state', async ({ request }) => {
  const createStateBody = await PwHelpers.createDefaultState(request);

  const inputData = {
    id: createStateBody.id,
    name: 'California',
    symbol: 'CA'
  };

  // Update State
  const response = await request.put(`/api/states/${inputData.id}`, { data: inputData });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(parseInt(body.id)).toBe(inputData.id);
  expect(body.name).toBe(inputData.name);
  expect(body.symbol).toBe(inputData.symbol);
});

test('destroy state', async ({ request }) => {
  const createStateBody = await PwHelpers.createDefaultState(request);

  const newStateId = createStateBody.id;

  // Destroy State
  const destroyStateResponse = await request.delete(`/api/states/${newStateId}`);

  expect(destroyStateResponse.ok()).toBeTruthy();

  const destroyStateBody = await destroyStateResponse.json();
  expect(destroyStateBody.msg).toBe('Deleted successfully');
});
