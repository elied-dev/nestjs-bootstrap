import { getTS, sleep } from 'src/utils';

describe('Tests for utils', () => {
  describe('Tests for "sleep" function', () => {
    it('should sleep for 1 seconds', async () => {
      const nowStart = getTS();
      await sleep(1000);
      const nowEnd = getTS();
      expect(nowEnd - nowStart).toBeGreaterThanOrEqual(1000);
    });
  });
});
