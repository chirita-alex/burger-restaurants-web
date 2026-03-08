import { expect,test } from '@playwright/test';

test.describe('Home page', () => {
  test('displays restaurant cards after loading', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'View details for Burger House' })).toBeVisible();
    await expect(page.locator('ul.grid[aria-busy="false"]')).toBeVisible();
  });

  test('shows skeleton placeholders while loading', async ({ page }) => {
    await page.goto('/');

    // MSW intercepts with a 500ms delay giving a window to assert skeletons
    await expect(page.locator('ul.grid[aria-busy="true"]')).toBeVisible();
  });

  // Block the MSW service worker so page.route() can intercept requests directly
  test.describe('with service worker blocked', () => {
    test.use({ serviceWorkers: 'block' });

    test('shows error notice when API fails', async ({ page }) => {
      await page.route('**/api/v1/restaurants/nearby**', (route) =>
        route.fulfill({ status: 500 })
      );

      await page.goto('/');

      // React Query retries twice with exponential backoff (~6s total before showing error)
      await expect(
        page.getByRole('heading', { name: 'Failed to load restaurants' })
      ).toBeVisible({ timeout: 15_000 });
    });

    test('shows empty notice when no restaurants returned', async ({ page }) => {
      await page.route('**/api/v1/restaurants/nearby**', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: [], nextCursor: undefined }),
        })
      );

      await page.goto('/');

      await expect(
        page.getByRole('heading', { name: 'No restaurants found' })
      ).toBeVisible();
    });
  });

  test('map widget renders with markers', async ({ page }) => {
    await page.goto('/');

    const map = page.getByRole('region', {
      name: 'Interactive map showing nearby restaurants',
    });
    await expect(map).toBeVisible();

    // Wait for cards to confirm API data has loaded, then check markers
    await expect(page.getByRole('link', { name: 'View details for Burger House' })).toBeVisible();
    await expect(page.locator('.leaflet-marker-icon').first()).toBeVisible();
  });

  test('clicking a card navigates to the restaurant page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'View details for Burger House' }).click();

    await expect(page).toHaveURL('/restaurant/1');
  });
});
