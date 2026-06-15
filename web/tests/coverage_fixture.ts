import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const istanbulCLIOutput = path.join(process.cwd(), '.nyc_output');

export function generateUUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const test = base.extend({
  context: async ({ context }, use) => {
    await context.addInitScript(() => {
      window.addEventListener('beforeunload', () => {
        (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__));
      });
    });

    await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
      if (coverageJSON) {
        if (!fs.existsSync(istanbulCLIOutput)) {
          fs.mkdirSync(istanbulCLIOutput, { recursive: true });
        }
        fs.writeFileSync(
          path.join(istanbulCLIOutput, `playwright_coverage_${generateUUID()}.json`),
          coverageJSON
        );
      }
    });

    await use(context);

    for (const page of context.pages()) {
      const coverage: string = await page.evaluate(() => JSON.stringify((window as any).__coverage__));
      if (coverage) {
        if (!fs.existsSync(istanbulCLIOutput)) {
          fs.mkdirSync(istanbulCLIOutput, { recursive: true });
        }
        fs.writeFileSync(
          path.join(istanbulCLIOutput, `playwright_coverage_${generateUUID()}.json`),
          coverage
        );
      }
    }
  },
});

export const expect = test.expect;
