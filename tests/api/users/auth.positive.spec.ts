import { test, expect } from "./fixtures/auth.fixture";
import { API_URL } from '../../config/env';

test.describe("Authentication API - Positive Tests", () => {
  test("Access profile", async ({ request, authToken, email, name }) => {
    const response = await request.get(`${API_URL}/users/profile`, {
      headers: {
        Accept: "application/json",
        "X-AUTH-TOKEN": authToken,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toHaveProperty("email", email);
    expect(body.data).toHaveProperty("name", name);
  });

  test("Logout user", async ({ request, authToken }) => {
    const response = await request.delete(`${API_URL}/users/logout`, {
      headers: {
        Accept: "application/json",
        "X-AUTH-TOKEN": authToken,
      },
    });

    expect(response.status()).toBe(200);
  });
});
