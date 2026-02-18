import { test, expect } from '@playwright/test';

test('API health', async ({ request }) => {
  const response = await request.get(
    '/notes/api/api-docs',
    {
      //enable if html is returned
      headers: { Accept: 'application/json' },
    }
  );

  expect(response.status()).toBe(200);

});