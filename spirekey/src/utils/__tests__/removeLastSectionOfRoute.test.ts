import {
  isStringInArray,
  removeLastSectionOfRoute,
} from '../removeLastSectionOfRoute';

describe('removeLastSectionOfRoute', () => {
  const whiteList: string[] = ['he-man', 'cringer', 'master of the universe'];
  describe('isStringInArray', () => {
    it('should return false if string is false', () => {
      expect(isStringInArray(undefined, whiteList)).toEqual(false);
    });
    it('should return false if whitelist array in undefined', () => {
      expect(isStringInArray(undefined)).toEqual(false);
    });
    it('should return false if string is NOT in whitelist', () => {
      expect(isStringInArray('skeletor', whiteList)).toEqual(false);
    });

    it('should return true if string is in whitelist', () => {
      expect(isStringInArray('he-man', whiteList)).toEqual(true);
      expect(isStringInArray('master of the universe', whiteList)).toEqual(
        true,
      );
    });
  });

  describe('removeLastSectionOfRoute', () => {
    it('should return the full route if the lastSection of the url is not in the whitelist', () => {
      const url = '/account/r:123/skeletor';
      expect(removeLastSectionOfRoute(url, whiteList)).toEqual(url);
    });
    it('should return the truncated route if the lastSection of the url is in the whitelist', () => {
      const url = '/account/r:123/he-man';
      expect(removeLastSectionOfRoute(url, whiteList)).toEqual(
        '/account/r:123',
      );
    });
  });
});
