import { Device } from '@/context/AccountsContext';
import { getDeviceIconSrc } from './getDeviceIconSrc';

export const returnUrlWithDevice = (url: string, device: Device) =>
  urlWithSearchParams(url, {
    device: objectParameterValue(device),
  });

/**
 * @todo: remove and add translations to smart contract
 */
export const addDeviceTranslations = (device: Device) =>
  objectParameterValue({
    [`${process.env.NAMESPACE}.webauthn-wallet.ADD_DEVICE`]: {
      title: 'Add device',
      value: 'Add a new device to your account: {0}',
      image: getDeviceIconSrc(device.deviceType),
    },
  });

export const objectParameterValue = (obj: any): string =>
  Buffer.from(JSON.stringify(obj)).toString('base64');

export const arrayParameterValue = (arr: any): string => JSON.stringify(arr);

export const urlWithSearchParams = (
  url: string,
  searchParameters: Record<string, string>,
): string => {
  const newUrl = new URL(url);
  Object.entries(searchParameters).forEach(([name, value]) =>
    newUrl.searchParams.append(name, value),
  );
  return newUrl.toString();
};

export const searchParamsToString = (
  searchParameters: Record<string, string>,
): string => {
  const searchParams = new URLSearchParams();
  Object.entries(searchParameters).forEach(([name, value]) =>
    searchParams.append(name, value),
  );
  return searchParams.toString();
};
