// @ts-check
const { test, expect } = require('@playwright/test');
const PwHelpers = require('./pw-helpers');

test('retrieve users', async ({ request }) => {
  const response = await request.get('/api/users');

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.length).toBeGreaterThanOrEqual(0);
});

test('create user', async ({ request }) => {
  const createStateBody = await PwHelpers.createDefaultState(request);

  const response = await request.post('/api/users', {
    data: {
      firstName: 'John',
      lastName: 'Doe',
      age: 35,
      weight: 185.3,
      income: 50000.0,
      stateId: createStateBody.id,
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(Number.isInteger(body.id)).toBeTruthy();
  expect(body.id).toBeGreaterThan(0);
  expect(body.firstName).toBe('John');
  expect(body.lastName).toBe('Doe');
  expect(body.age).toBe(35);
  expect(body.weight).toBe(185.3);
  expect(body.income).toBe(50000.0);
  expect(body.stateId).toBe(createStateBody.id);
});

test('retrieve user', async ({ request }) => {
  const createUserBody = await PwHelpers.createDefaultUser(request);
  const newUserId = createUserBody.id;

  const response = await request.get(`/api/users/${newUserId}`);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(Number.isInteger(body.id)).toBeTruthy();

  expect(body.id).toBe(newUserId);
});

test('destroy user', async ({ request }) => {
  const createUserBody = await PwHelpers.createDefaultUser(request);
  const newUserId = createUserBody.id;

  const response = await request.delete(`/api/users/${newUserId}`);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.msg).toBe('Deleted successfully');
});
