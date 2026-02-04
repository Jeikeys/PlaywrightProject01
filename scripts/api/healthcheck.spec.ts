import { test, expect } from '@playwright/test';

test('API health', async ({ request }) => {
  const response = await request.get(
    '/notes/api/api-docs',
    {
      headers: { Accept: 'application/json' },
    }
  );

  expect(response.status()).toBe(200);

});