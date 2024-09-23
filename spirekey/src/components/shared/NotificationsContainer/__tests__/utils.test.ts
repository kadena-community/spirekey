import { mapVariantToIntent } from '../utils';

describe('NotificationsContainer utils', () => {
  describe('mapVariantToIntent', () => {
    it('should return the correct intent for the given variant', () => {
      expect(mapVariantToIntent('error')).toEqual('negative');
      expect(mapVariantToIntent('notice')).toEqual('info');
      expect(mapVariantToIntent('success')).toEqual('positive');
      expect(mapVariantToIntent('warning')).toEqual('warning');
    });
  });
});
