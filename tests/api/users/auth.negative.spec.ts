import { test, expect } from "./fixtures/auth.fixture";
import { customAlphabet } from "nanoid";

const BASE_URL = "https://practice.expandtesting.com/notes/api";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 4);

test.describe("Authentication API - Negative Tests", () => {
  test("Register with missing password", async ({ request, name, email }) => {
    const response = await request.post(`${BASE_URL}/users/register`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: { name, email },
    });

    expect(response.status()).toBe(400);
  });

  test("Login with wrong password", async ({ request, email }) => {
    const response = await request.post(`${BASE_URL}/users/login`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: { email, password: "WrongPass123!" },
    });

    expect(response.status()).toBe(401);
  });

  test("Login with non-existent user", async ({ request }) => {
    const fakeEmail = `nouser_${Date.now()}_${nanoid()}@example.com`;
    const response = await request.post(`${BASE_URL}/users/login`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: { email: fakeEmail, password: "Password123!" },
    });

    expect(response.status()).toBe(401);
  });

  test("Access profile without token", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/profile`, {
      headers: { Accept: "application/json" },
    });

    expect(response.status()).toBe(401);
  });

  test("Logout with invalid token", async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/logout`, {
      headers: { Accept: "application/json", "X-AUTH-TOKEN": "invalid_token" },
    });

    expect(response.status()).toBe(401);
  });

  test("Register with existing email", async ({
    request,
    name,
    email,
    password,
    registeredUser,
  }) => {
    const response = await request.post(`${BASE_URL}/users/register`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: { name, email, password },
    });

    expect(response.status()).toBe(409);
  });
});