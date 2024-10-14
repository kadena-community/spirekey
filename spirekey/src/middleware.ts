import { hash } from '@kadena/cryptography-utils';
import type { NextRequest } from 'next/server';
import parser from 'ua-parser-js';

const createClientId = (ua: string): string => hash(ua);

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (!process.env.GA_ACCOUNT || !process.env.GA_ACCOUNT_API) {
    console.warn('google account and api secret are missing');
    return;
  }

  const userAgent = request.headers.get('user-agent') ?? '';
  const ua = parser(userAgent);
  if (userAgent?.includes('Edge Functions')) return;

  const clientId = createClientId(userAgent);
  const data = JSON.stringify({
    client_id: clientId, // A unique client identifier
    user_id: clientId, // A unique client identifier
    events: [
      {
        name: 'page_view',
        params: {
          page_title: 'Spirekey',
          page_location: request.url,
          page_referrer: request.referrer,
          time_to_section: 123456,
          send_page_view: true,
        },
      },
      {
        name: 'page_view_ua',
        params: {
          page_title: 'Spirekey',
          page_location: request.url,
          page_referrer: request.referrer,
          time_to_section: 123456,
          send_page_view: true,
          browserName: ua.browser.name,
          browserVersion: ua.browser.version,
          deviceModel: ua.device.model,
          deviceType: ua.device.type,
          deviceVendor: ua.device.vendor,
          engineName: ua.engine.name,
          engineVersion: ua.engine.version,
          osName: ua.os.name,
          osVersion: ua.os.version,
          ua: ua.ua,
        },
      },
    ],
  });

  await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_ACCOUNT}&api_secret=${process.env.GA_ACCOUNT_API}`,
    {
      method: 'POST',
      body: data,
    },
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/welcome',
    '/connect',
    '/sign',
    '/register',
    '/recover',
    '/embedded/notification',
    '/settings',
    '/pact',
    '/accounts/:raccount/devices/:cid/',
    '/accounts/:raccount/devices/:cid/transfer',
    '/accounts/:raccount/devices/:cid/transactions',
    '/accounts/:raccount/devices/:cid/settings',
  ],
};
