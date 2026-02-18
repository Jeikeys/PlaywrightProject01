import { test as base, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { customAlphabet } from "nanoid";

const BASE_URL = "https://practice.expandtesting.com/notes/api";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);

export const test = base.extend<{
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  registeredUser: void;
  authToken: string;
}>({
  // Names
  firstName: async ({}, use) => {
    await use(faker.person.firstName());
  },

  lastName: async ({}, use) => {
    await use(faker.person.lastName());
  },

  name: async ({ firstName, lastName }, use) => {
    await use(`${firstName} ${lastName}`);
  },

  // Email
  email: async ({ lastName }, use) => {
    const email = `${lastName.toLowerCase()}_${Date.now()}_${nanoid()}@email.com`;
    await use(email);
  },

  // Password
  password: async ({}, use) => {
    await use("XPasssword.331@");
  },

  // Register user to ensure existing account
  registeredUser: async ({ request, name, email, password }, use) => {
    const res = await request.post(`${BASE_URL}/users/register`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: { name, email, password },
    });

    expect(res.status()).toBe(201);
    await use();
  },

  // Login using registeredUser
  authToken: async ({ request, email, password, registeredUser }, use) => {
    const loginRes = await request.post(`${BASE_URL}/users/login`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: { email, password },
    });

    expect(loginRes.status()).toBe(200);
    const body = await loginRes.json();
    await use(body.data.token);
  },
});

export { expect };