import { test, expect } from './coverage_fixture';

test.describe('Authentication Pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/login', async route => {
      const payload = route.request().postDataJSON();
      if (payload.email === 'valid@email.com' && payload.password === 'password123') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            token: 'fake-jwt-token',
            user: {
              id: '1',
              name: 'John',
              surname: 'Doe',
              email: 'valid@email.com',
              avatar: 'avatar-url',
              bio: 'bio',
              whatsapp: '123456789'
            }
          })
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Invalid credentials' })
        });
      }
    });

    await page.route('**/signup', async route => {
       await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            user: [{ id: '1' }]
          })
       });
    });

    await page.route('**/forget_password', async route => {
       await route.fulfill({ status: 200 });
    });
  });

  const getField = (page, label) => page.locator('div.label-float').filter({ has: page.locator('label', { hasText: new RegExp(`^${label}$`) }) }).locator('input');

  test('should login successfully', async ({ page }) => {
    await page.goto('/');
    await getField(page, 'E-mail').fill('valid@email.com');
    await getField(page, 'Senha').fill('password123');
    await page.click('button:has-text("Entrar")');

    await expect(page).toHaveURL(/\/landing/, { timeout: 15000 });
  });

  test('should show error for invalid login', async ({ page }) => {
    await page.goto('/');
    await getField(page, 'E-mail').fill('invalid@email.com');
    await getField(page, 'Senha').fill('wrongpass');
    await page.click('button:has-text("Entrar")');

    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
  });

  test('should navigate to sign up page and register', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Cadastre-se');
    await expect(page).toHaveURL(/\/signin/);

    await getField(page, 'Nome').fill('John');
    await getField(page, 'Sobrenome').fill('Doe');
    await getField(page, 'E-mail').fill('new@email.com');
    await getField(page, 'Senha').fill('password123');

    await page.route('**/login', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            token: 'fake-jwt-token',
            user: { id: '1', name: 'John', email: 'new@email.com' }
          })
        });
    });

    await page.click('button:has-text("Concluir cadastro")');
    await expect(page).toHaveURL(/\/$/);
  });

  test('should navigate to forget password page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Esqueci minha senha');
    await expect(page).toHaveURL(/\/forget-password/);

    await getField(page, 'E-mail').fill('valid@email.com');
    await page.click('button:has-text("Enviar")');

    await expect(page).toHaveURL(/\/recovery-success/);
  });

  test('should handle password recovery flow', async ({ page }) => {
    await page.goto('/recovery-password/fake-token');
    await getField(page, 'Senha').fill('newpassword123');
    await getField(page, 'Confirmação da senha').fill('newpassword123');

    await page.route('**/recovery_password**', async route => {
        await route.fulfill({ status: 200 });
    });

    await page.click('button:has-text("Confirmar")');
    await expect(page).toHaveURL(/\/$/);
  });

  test('should show success pages', async ({ page }) => {
    await page.goto('/signinSuccess');
    await expect(page.locator('text=Cadastro concluído')).toBeVisible();
    await page.click('a:has-text("Fazer login")');
    await expect(page).toHaveURL(/\/$/);

    await page.goto('/recovery-success');
    await expect(page.locator('text=Redefinição concluída')).toBeVisible();
    await page.click('a:has-text("Voltar ao login")');
    await expect(page).toHaveURL(/\/$/);
  });
});
