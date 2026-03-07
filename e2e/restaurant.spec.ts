import { test, expect } from '@playwright/test';

test.describe('Restaurant page', () => {
  test('displays restaurant name, address, hours and description', async ({ page }) => {
    await page.goto('/restaurant/1');

    await expect(page.getByRole('heading', { name: 'Burger House', level: 2 })).toBeVisible();
    await expect(page.getByText('Mon-Sun 10:00-22:00')).toBeVisible();
    await expect(page.getByText('Burger St. 1, Bucharest, Romania')).toBeVisible();
    await expect(page.getByText('sourced daily from local farms')).toBeVisible();
  });

  test('shows skeleton while loading', async ({ page }) => {
    await page.goto('/restaurant/1');

    await expect(page.locator('.restaurant-details--loading[aria-busy="true"]')).toBeVisible();
  });

  test('reviews section renders review cards', async ({ page }) => {
    await page.goto('/restaurant/1');

    await expect(page.getByRole('heading', { name: 'Reviews', level: 2 })).toBeVisible();
    await expect(page.getByText('Amazing burger, crispy and juicy!')).toBeVisible();
    await expect(page.getByText('Good but could be better.')).toBeVisible();
    await expect(page.getByText('Absolutely loved it, will come back!')).toBeVisible();
  });

  test('loads more reviews on scroll (infinite scroll)', async ({ page }) => {
    await page.goto('/restaurant/1');

    await expect(page.getByText('Absolutely loved it, will come back!')).toBeVisible();
    await expect(page.getByText('Decent place, nothing special.')).not.toBeVisible();
    await page.locator('.restaurant-reviews__sentinel').scrollIntoViewIfNeeded();
    await expect(page.getByText('Decent place, nothing special.')).toBeVisible();
  });

  test.describe('with service worker blocked', () => {
    test.use({ serviceWorkers: 'block' });

    test('shows error notice when API fails', async ({ page }) => {
      await page.route('**/api/v1/restaurants/*', (route) =>
        route.fulfill({ status: 500 })
      );

      await page.route('**/api/v1/reviews**', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: [], nextCursor: undefined }),
        })
      );

      await page.goto('/restaurant/1');

      await expect(
        page.getByRole('heading', { name: 'Failed to load restaurant' })
      ).toBeVisible({ timeout: 15_000 });
    });

    test('shows not-found notice for unknown restaurant ID', async ({ page }) => {
      await page.route('**/api/v1/restaurants/*', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: 'null',
        })
      );
      await page.route('**/api/v1/reviews**', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: [], nextCursor: undefined }),
        })
      );

      await page.goto('/restaurant/999');

      await expect(
        page.getByRole('heading', { name: 'Restaurant not found' })
      ).toBeVisible();
    });

    test('shows empty notice when no reviews', async ({ page }) => {
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

      await expect(
        page.getByRole('heading', { name: 'No reviews yet' })
      ).toBeVisible();
    });
  });
});

test.describe('ReadMore — restaurant description', () => {
  test('shows truncated description with "Read more" button on load', async ({ page }) => {
    await page.goto('/restaurant/1');
    await expect(page.getByRole('button', { name: 'Read more: restaurant description' })).toBeVisible();
    // text beyond 300 chars is not rendered
    await expect(page.getByText('Our signature sauces')).not.toBeVisible();
  });

  test('expands description on "Read more" click', async ({ page }) => {
    await page.goto('/restaurant/1');
    await page.getByRole('button', { name: 'Read more: restaurant description' }).click();
    await expect(page.getByText('Our signature sauces')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Show less: restaurant description' })).toBeVisible();
  });

  test('collapses description on "Show less" click', async ({ page }) => {
    await page.goto('/restaurant/1');
    await page.getByRole('button', { name: 'Read more: restaurant description' }).click();
    await page.getByRole('button', { name: 'Show less: restaurant description' }).click();
    await expect(page.getByText('Our signature sauces')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Read more: restaurant description' })).toBeVisible();
  });
});

test.describe('ReadMore — review cards', () => {
  test('shows "Read more" button for long reviews', async ({ page }) => {
    await page.goto('/restaurant/1');
    // review-1 is ~1320 chars, well above the 650 maxChars limit
    await expect(page.getByRole('button', { name: 'Read more: Jhon Doe review' }).first()).toBeVisible();
  });

  test('expands a review on "Read more" click', async ({ page }) => {
    await page.goto('/restaurant/1');
    const readMoreBtn = page.getByRole('button', { name: 'Read more: Jhon Doe review' }).first();
    await readMoreBtn.click();
    await expect(page.getByRole('button', { name: 'Show less: Jhon Doe review' }).first()).toBeVisible();
  });
});
