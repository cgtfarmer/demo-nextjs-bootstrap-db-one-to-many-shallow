// @ts-check
const { test, expect } = require('@playwright/test');

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
  // Create State
  const createStateResponse = await request.post('/api/states', {
    data: {
      name: 'Nebraska',
      symbol: 'NE',
    }
  });

  expect(createStateResponse.ok()).toBeTruthy();

  const createStateBody = await createStateResponse.json();
  const newStateId = createStateBody.id;

  // Retrieve State
  const getStateResponse = await request.get(`/api/states/${newStateId}`);

  expect(getStateResponse.ok()).toBeTruthy();

  const getStateBody = await getStateResponse.json();
  expect(getStateBody.id).toBe(newStateId);
});

test('destroy state', async ({ request }) => {
  // Create State
  const createStateResponse = await request.post('/api/states', {
    data: {
      name: 'Nebraska',
      symbol: 'NE',
    }
  });

  expect(createStateResponse.ok()).toBeTruthy();

  const createStateBody = await createStateResponse.json();
  const newStateId = createStateBody.id;

  // Destroy State
  const destroyStateResponse = await request.delete(`/api/states/${newStateId}`);

  expect(destroyStateResponse.ok()).toBeTruthy();

  const destroyStateBody = await destroyStateResponse.json();
  expect(destroyStateBody.msg).toBe('Deleted successfully');
});
