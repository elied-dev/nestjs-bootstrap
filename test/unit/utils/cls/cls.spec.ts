import { ClsKeys } from 'src/utils/cls/cls.constants';
import { ClsUtils } from 'src/utils/cls/cls.utils';

describe('Test for CLS middleware', () => {
  it('Should test CLS constants', () => {
    expect(ClsKeys).toEqual({
      REQUEST_ID: 'requestId',
      END_REQUEST_TIME: 'endRequestTime',
      START_REQUEST_TIME: 'startRequestTime',
    });
  });

  describe('Test for CLS utils method', () => {
    it('Should run default namespace', () => {
      const namespace = ClsUtils.getNs();
      namespace.run(() => {
        ClsUtils.set(ClsKeys.REQUEST_ID, 'request-id');

        const allData = ClsUtils.getAll();

        expect(ClsUtils.get(ClsKeys.REQUEST_ID)).toBe('request-id');
        expect(allData).toEqual({ [ClsKeys.REQUEST_ID]: 'request-id' });
      });
    });

    it('Should run specific namespace', () => {
      const namespaceName = 'new-namespace';
      const namespace = ClsUtils.getNs(namespaceName);
      namespace.run(() => {
        ClsUtils.set(ClsKeys.REQUEST_ID, 'request-id', namespaceName);

        const allData = ClsUtils.getAll(namespaceName);

        expect(allData).toEqual({ [ClsKeys.REQUEST_ID]: 'request-id' });
      });
    });

    it('should fail finding a key in namespace, but not exiting', () => {
      const namespaceName = 'new-namespace';
      const namespace = ClsUtils.getNs(namespaceName);
      namespace.run(() => {
        const data = ClsUtils.get('non-existing-key');

        expect(data).toBeUndefined;
      });
    });
  });
});
