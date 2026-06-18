import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

describe('controllers architecture', () => {
  it('does not use the raw database query helper in controllers', () => {
    const controllersDir = path.resolve(__dirname, '../../src/controllers');
    const controllerFiles = fs
      .readdirSync(controllersDir)
      .filter((file) => file.endsWith('Controller.ts'));

    const rawQueryImports = controllerFiles.filter((file) => {
      const contents = fs.readFileSync(path.join(controllersDir, file), 'utf8');

      return contents.includes('../database/query');
    });

    expect(rawQueryImports).toEqual([]);
  });
});
