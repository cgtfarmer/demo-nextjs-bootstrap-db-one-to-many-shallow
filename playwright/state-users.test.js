// @ts-check
const { test, expect } = require('@playwright/test');
const PwHelpers = require('./pw-helpers');

test('retrieve state users', async ({ request }) => {
  const createUserBody = await PwHelpers.createDefaultUser(request);

  await PwHelpers.createDefaultUserWithStateId(request, createUserBody.stateId);

  await PwHelpers.createDefaultUser(request);

  const response = await request.get(`/api/states/${createUserBody.stateId}/users`);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.length).toBe(2);

  const allUsersResponse = await request.get('/api/users');
  const allUsersBody = await allUsersResponse.json();

  expect(allUsersBody.length).toBeGreaterThan(2);
});
