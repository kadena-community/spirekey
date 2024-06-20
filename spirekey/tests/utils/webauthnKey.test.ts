import { getDeviceType } from '@/utils/webauthnKey';
import { describe, expect, it } from 'vitest';

describe('webauthn key', () => {
  describe('device type determination', () => {
    describe('when a hybrid transport type is used', () => {
      it('should return the `phone` type', () => {
        expect(getDeviceType(['hybrid'])).toEqual('phone');
      });
    });
    describe('when a internal and hybrid transport type is used', () => {
      it('should return the `phone` type', () => {
        expect(getDeviceType(['internal', 'hybrid'])).toEqual('phone');
      });
    });
    describe('when a internal transport type is used', () => {
      // At some point we should include user agent to detect if
      // the device might be a phone or not
      it('should return the `desktop` type', () => {
        expect(getDeviceType(['internal'])).toEqual('desktop');
      });
    });
    describe('when a usb transport type is used', () => {
      it('should return the `security-key` type', () => {
        expect(getDeviceType(['usb'])).toEqual('security-key');
      });
    });
  });
});
