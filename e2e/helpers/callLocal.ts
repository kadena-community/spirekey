import type { ICommandResult } from '@kadena/client';
import fetch from 'cross-fetch';

export async function isModuleDeployed(
  apiHost: string,
  body: string,
): Promise<
  boolean
> {
  const response = await fetch(`${apiHost}/api/v1/local`, {
    headers: {
      accept: 'application/json;charset=utf-8, application/json',
      'cache-control': 'no-cache',
      'content-type': 'application/json;charset=utf-8',
      pragma: 'no-cache',
    },
    body,
    method: 'POST',
  });

  const responseJson = (await response.json()) as ICommandResult;
  if (responseJson.result.status === 'success') {
    return true;
  }
  const { error } = responseJson.result;
  if (error === undefined || typeof error === 'string') {
    return {
      error: error || 'unknown error',
    };
  }
  return {
    error:
      'message' in error
        ? (error.message as string)
        : JSON.stringify(responseJson.result.error),
  };
}
