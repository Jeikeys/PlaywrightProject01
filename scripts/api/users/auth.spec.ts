import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practice.expandtesting.com/notes/api';

let email: string;
let name: string;
const password = 'Password123!';
let authToken: string;

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

test.describe('Authentication API', () => {

  test.beforeAll('Register User', async ({ request }) => {
    name = makeid(10);
    email = `qa_user_${Date.now()}@example.com`;

    const response = await request.post(`${BASE_URL}/users/register`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        name,
        email,
        password,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('message');
  });

  test.beforeEach('Login User', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users/login`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        email,
        password,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toHaveProperty('token');
    
    authToken = body.data.token;
    expect(authToken).toBeTruthy();
  });

  test('Register, Login, Logout user', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/logout`, {
      headers: {
        Accept: 'application/json',
        'X-AUTH-TOKEN': authToken,
      },
    });

    expect(response.status()).toBe(200);
  });

});