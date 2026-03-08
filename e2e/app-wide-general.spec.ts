import { expect,test } from '@playwright/test';

test.describe('App wide general behavior', () => {
  test('page title updates on the home route', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Nearby restaurants');
  });

  test('page title updates on the restaurant route', async ({ page }) => {
    await page.goto('/restaurant/1');

    await expect(page).toHaveTitle('Restaurant details');
  });

  test.describe('with service worker blocked', () => {
    test.use({ serviceWorkers: 'block' });

    test('unknown route shows "Page not found" notice', async ({ page }) => {
      await page.goto('/this-route-does-not-exist');

      await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    });

    test('home link on a 404 notice navigates back home', async ({ page }) => {
      await page.goto('/this-route-does-not-exist');

      await page.getByRole('link', { name: 'Go to home page' }).click();

      await expect(page).toHaveURL('/');
    });

    test('home link on an error notice navigates back home', async ({ page }) => {
      await page.route('**/api/v1/restaurants/nearby**', (route) =>
        route.fulfill({ status: 500 })
      );

      await page.goto('/');

      await expect(page.getByRole('heading', { name: 'Failed to load restaurants' })).toBeVisible({ timeout: 15_000 });
      await page.goto('/this-route-does-not-exist');
      await page.getByRole('link', { name: 'Go to home page' }).click();

      await expect(page).toHaveURL('/');
    });
  });
});
