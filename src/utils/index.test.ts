import { sleep, getTS, generateRandomString } from './index';
describe('Tests for utils', () => {
  describe('Tests for "sleep" function', () => {
    it('should sleep for 1 seconds', async () => {
      const nowStart = getTS();
      await sleep(1000);
      const nowEnd = getTS();
      expect(nowEnd - nowStart).toBeGreaterThanOrEqual(1000);
    });
  });

  describe('Tests for "generateRandomString" function', () => {
    it('should test simple generation', () => {
      const first = generateRandomString(3);
      const second = generateRandomString(4);
      const third = generateRandomString(3);

      expect(first.length).toBe(3);
      expect(second.length).toBe(4);
      expect(third.length).toBe(3);
      expect(first).not.toBe(third);
    });
  });
});
