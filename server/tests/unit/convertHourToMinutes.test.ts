import { describe, expect, it } from 'vitest';

import convertHourToMinutes from '../../src/utils/convertHourToMinutes';

describe('convertHourToMinutes', () => {
  it.each([
    ['08:00', 480],
    ['08:30', 510],
    ['23:59', 1439],
  ])('converts %s to %i minutes', (input, expected) => {
    expect(convertHourToMinutes(input)).toBe(expected);
  });
});
