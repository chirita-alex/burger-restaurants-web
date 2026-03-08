import { describe, expect,it } from 'vitest';

import { prettyDate } from './prettyDate';

describe('prettyDate', () => {
  it('formats a Date object', () => {
    const date = new Date('2024-01-15T00:00:00.000Z');
    expect(prettyDate(date)).toBe(date.toLocaleDateString());
  });

  it('formats an ISO string', () => {
    const iso = '2024-06-20T12:00:00.000Z';
    expect(prettyDate(iso)).toBe(new Date(iso).toLocaleDateString());
  });

  it('returns the same result for Date and equivalent string', () => {
    const iso = '2023-11-01T08:00:00.000Z';
    expect(prettyDate(iso)).toBe(prettyDate(new Date(iso)));
  });
});
