import { expect, test } from '@playwright/test';

test.describe('Header navigation', () => {
  test('header logo links to home page', async ({ page }) => {
    await page.goto('/restaurant/1');

    await page.getByRole('link', { name: 'Burger restaurants home page' }).click();

    await expect(page).toHaveURL('/');
  });

  test('header nav link navigates to home page', async ({ page }) => {
    await page.goto('/restaurant/1');

    await page.getByRole('link', { name: 'Nearby restaurants page' }).click();

    await expect(page).toHaveURL('/');
  });

  test('back-navigation from restaurant page returns to home', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View details for Burger House' }).click();
    await expect(page).toHaveURL('/restaurant/1');

    await page.goBack();

    await expect(page).toHaveURL('/');
  });
});
