import { test, expect } from './coverage_fixture';

test.describe('App Pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('@RNauth:user', JSON.stringify({
        id: '1',
        name: 'John',
        surname: 'Doe',
        email: 'john@doe.com',
        avatar: 'http://avatar.url',
        bio: 'Tester bio',
        whatsapp: '11999999999'
      }));
      window.localStorage.setItem('@RNauth:token', 'fake-token');
    });

    await page.route('**/connections', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ total: 100 })
      });
    });

    await page.route('**/classes?**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 1,
            subject: 'Matemática',
            cost: 50,
            user_id: 1,
            name: 'John Doe',
            avatar: 'http://avatar.url',
            whatsapp: '11999999999',
            bio: 'Best math teacher',
            schedules: [{ week_day: 1, from: '8:00', to: '10:00' }]
          }
        ])
      });
    });

    await page.route('**/users/**', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([{
                id: '1',
                name: 'John',
                surname: 'Doe',
                email: 'john@doe.com',
                avatar: 'http://avatar.url',
                bio: 'Tester bio',
                whatsapp: '11999999999'
            }])
        });
    });

    await page.route('**/classes/1', async route => {
        await route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'No class found' })
        });
    });

    await page.route('**/profile/**', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: '1',
                name: 'John',
                surname: 'Doe',
                email: 'john@doe.com',
                avatar: 'http://avatar.url',
                bio: 'Tester bio',
                whatsapp: '11999999999'
            })
        });
    });
  });

  test('should display landing page with connections', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.total-connections')).toContainText('100');
    await expect(page.locator('h2:has-text("John Doe")')).toBeVisible();
  });

  test('should navigate to study page and search for classes', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Estudar")');
    await expect(page).toHaveURL(/\/study/);

    await page.locator('select[name="subject"]').selectOption({ label: 'Matemática' });
    await page.locator('select[name="weekDay"]').selectOption({ value: '1' });
    await page.locator('input[name="time"]').fill('08:00');

    await page.click('button:has-text("Buscar")');

    await expect(page.locator('text=John Doe')).toBeVisible();
    await expect(page.locator('text=Best math teacher')).toBeVisible();
  });

  test('should navigate to give-classes page and create a class', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Dar aulas")');
    await expect(page).toHaveURL(/\/give-classes/);

    await page.locator('input[name="whatsapp"]').fill('11988888888');
    await page.locator('textarea[name="bio"]').fill('I love teaching math.');
    await page.locator('select[name="subject"]').selectOption({ label: 'Matemática' });
    await page.locator('input[name="cost"]').fill('100');

    await page.locator('select[name="week_day"]').selectOption({ value: '1' });
    await page.locator('input[name="from"]').fill('10:00');
    await page.locator('input[name="to"]').fill('12:00');

    await page.route('**/classes', async route => {
        if (route.request().method() === 'POST') {
            await route.fulfill({ status: 201 });
        } else {
            await route.continue();
        }
    });

    await page.click('button:has-text("Salvar cadastro")');
    await expect(page).toHaveURL(/\/give-classes-success/);
  });

  test('should navigate to user profile and update it', async ({ page }) => {
    await page.goto('/');
    await page.click('a.user-button');
    await expect(page).toHaveURL(/\/perfil/);

    await page.locator('input[name="whatsapp"]').fill('11977777777');
    await page.locator('textarea[name="bio"]').fill('Updated bio info.');

    await page.route('**/users/1', async route => {
        if (route.request().method() === 'PUT') {
            await route.fulfill({ status: 200 });
        } else {
            await route.continue();
        }
    });

    page.on('dialog', dialog => dialog.accept());

    await page.click('button:has-text("Salvar cadastro")');
    await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
  });

  test('should logout successfully', async ({ page }) => {
    await page.goto('/');
    await page.click('button.logout-button');
    await expect(page).toHaveURL(/\/$/);
    const storagedUser = await page.evaluate(() => window.localStorage.getItem('@RNauth:user'));
    expect(storagedUser).toBeNull();
  });
});
