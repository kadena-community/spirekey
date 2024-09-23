import { createStatus } from '../utils';

describe('Onboarding stepper utils', () => {
  describe('createStatus', () => {
    it('should return inactive if the step is undefined', () => {
      const result = createStatus(undefined, 2);
      expect(result).toEqual('inactive');
    });
    it('should return active if the step is equal to idx', () => {
      expect(createStatus(2, 2)).toEqual('active');
    });
    it('should return active if the idx less than step', () => {
      expect(createStatus(2, 1)).toEqual('active');
    });
    it('should return inactive if the idx more than step', () => {
      expect(createStatus(2, 4)).toEqual('inactive');
    });
  });
});
