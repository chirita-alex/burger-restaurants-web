import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const wcagTags = ['wcag21aa'];

test.describe('Accessibility - axe-core WCAG 2.1 AA', () => {
  test('home page — restaurant cards loaded', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('ul.grid[aria-busy="false"]')).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

    expect(results.violations).toEqual([]);
  });

  test('home page — skeleton loading state', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('ul.grid[aria-busy="true"]')).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

    expect(results.violations).toEqual([]);
  });

  test('restaurant page — details and reviews loaded', async ({ page }) => {
    await page.goto('/restaurant/1');

    await expect(page.getByRole('heading', { name: 'Burger House', level: 2 })).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByRole('heading', { name: 'Reviews', level: 2 })).toBeVisible({
      timeout: 15_000,
    });

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

    expect(results.violations).toEqual([]);
  });

  test.describe('with service worker blocked', () => {
    test.use({ serviceWorkers: 'block' });

    test('home page — error notice', async ({ page }) => {
      await page.route('**/api/v1/restaurants/nearby**', (route) => route.fulfill({ status: 500 }));

      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'Failed to load restaurants' })).toBeVisible({
        timeout: 15_000,
      });

      const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

      expect(results.violations).toEqual([]);
    });

    test('home page — empty notice', async ({ page }) => {
      await page.route('**/api/v1/restaurants/nearby**', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: [], nextCursor: undefined }),
        })
      );

      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'No restaurants found' })).toBeVisible();

      const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

      expect(results.violations).toEqual([]);
    });

    test('restaurant page — error notice', async ({ page }) => {
      await page.route('**/api/v1/restaurants/*', (route) => route.fulfill({ status: 500 }));
      await page.route('**/api/v1/reviews**', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: [], nextCursor: undefined }),
        })
      );

      await page.goto('/restaurant/1');
      await expect(page.getByRole('heading', { name: 'Failed to load restaurant' })).toBeVisible({
        timeout: 15_000,
      });

      const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

      expect(results.violations).toEqual([]);
    });

    test('restaurant page — empty reviews notice', async ({ page }) => {
      await page.route('**/api/v1/restaurants/*', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: '1',
            name: 'Burger House',
            imageUrl: '/images/restaurants/restaurant_3.webp',
            program: { openingHours: 'Mon-Sun 10:00-22:00' },
            address: { country: 'Romania', city: 'Bucharest', street: 'Burger St. 1' },
            geoLocation: { latitude: 44.4268, longitude: 26.1025 },
            overallRating: { taste: 4.5, texture: 4.2, visual: 4.8, general: 4.5 },
            description: 'Best burgers in town with fresh ingredients',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            ownerId: 'owner-1',
          }),
        })
      );
      await page.route('**/api/v1/reviews**', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: [], nextCursor: undefined }),
        })
      );

      await page.goto('/restaurant/1');
      await expect(page.getByRole('heading', { name: 'No reviews yet' })).toBeVisible();

      const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

      expect(results.violations).toEqual([]);
    });

    test('404 — page not found notice', async ({ page }) => {
      await page.goto('/this-route-does-not-exist');
      await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();

      const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

      expect(results.violations).toEqual([]);
    });
  });
});
