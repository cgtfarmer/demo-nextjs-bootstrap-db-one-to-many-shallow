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

  const inputData = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'M',
    age: 35,
    weight: 185.3,
    income: 50000.0,
    stateId: createStateBody.id,
  };

  const response = await request.post('/api/users', { data: inputData });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(Number.isInteger(body.id)).toBeTruthy();
  expect(body.id).toBeGreaterThan(0);
  expect(body.firstName).toBe(inputData.firstName);
  expect(body.lastName).toBe(inputData.lastName);
  expect(body.gender).toBe(inputData.gender);
  expect(body.age).toBe(inputData.age);
  expect(body.weight).toBe(inputData.weight);
  expect(body.income).toBe(inputData.income);
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

test('update user', async ({ request }) => {
  const createUserBody = await PwHelpers.createDefaultUser(request);

  const inputData = {
    id: createUserBody.id,
    firstName: 'Jane',
    lastName: 'Smith',
    gender: 'F',
    age: 33,
    weight: 155.1,
    income: 40000.0,
    stateId: createUserBody.id,
  };

  const response = await request.put(`/api/users/${inputData.id}`, { data: inputData });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(parseInt(body.id)).toBe(inputData.id);
  expect(body.firstName).toBe(inputData.firstName);
  expect(body.lastName).toBe(inputData.lastName);
  expect(body.gender).toBe(inputData.gender);
  expect(body.age).toBe(inputData.age);
  expect(body.weight).toBe(inputData.weight);
  expect(body.income).toBe(inputData.income);
  expect(body.stateId).toBe(createUserBody.id);
});

test('destroy user', async ({ request }) => {
  const createUserBody = await PwHelpers.createDefaultUser(request);
  const newUserId = createUserBody.id;

  const response = await request.delete(`/api/users/${newUserId}`);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.msg).toBe('Deleted successfully');
});
