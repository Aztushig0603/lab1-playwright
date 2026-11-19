
import { test, expect, Page } from '@playwright/test';

// Нэвтэрсэн хэрэглэгчийг системээс гаргах функц.
async function logout(page: Page) {
  // Нэвтэрсэн хуудас дээр байгаа эсэхийг шалгана.
  if (!/inventory|cart/.test(page.url())) {
    return;
  }

  // Цэсийг нээж Logout товчийг дарна.
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();

  // Login хуудас руу буцсаныг шалгана.
  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
}

// Тест бүрийн дараа Logout хийнэ.
test.afterEach(async ({ page }) => {
  await logout(page);
});

// TEST 1: Амжилттай нэвтрэх
test('амжилттай нэвтрэх', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();
});

// TEST 2: Амжилтгүй нэвтрэх
test('буруу нууц үгээр нэвтрэхэд алдаа харуулах', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  await page.getByRole('button', { name: 'Login' }).click();

  // SauceDemo-ийн алдааны элементийг data-test attribute-аар олно.
  await expect(
    page.locator('[data-test="error"]')
  ).toContainText('Username and password do not match any user');

  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
});

// TEST 3: Бараа сагслах
test('нэвтэрсний дараа барааг сагслах', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // Эхний барааг сагсанд нэмнэ.
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Сагсны тоог шалгана.
  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('1');

  // Сагс руу орно.
  await page.locator('.shopping_cart_link').click();

  // Бараа сагсанд нэмэгдсэнийг шалгана.
  await expect(
    page.getByText('Sauce Labs Backpack')
  ).toBeVisible();

  await expect(page).toHaveURL(/cart\.html/);
});
