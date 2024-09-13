import { charArray } from '../characters';

describe('characters', () => {
  it('should return charArray', () => {
    expect(charArray.length).toBe(64);
  });
});
