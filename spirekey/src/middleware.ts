//import { hash } from '@kadena/cryptography-utils';
import type { NextRequest } from 'next/server';

// const createClientId = (request: NextRequest): string => {
//   const str = `${request.headers.get('user-agent')}${request.headers.get('sec-ch-ua-platform')}`;
//   return hash(str);
// };

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (!process.env.GA_ACCOUNT || !process.env.GA_ACCOUNT_API) {
    throw new Error('google account and api secret are missing');
  }

  //const clientId = createClientId(request);

  const userAgent = request.headers.get('user-agent');
  console.log(userAgent);
  if (userAgent?.includes('Edge Functions')) return;

  console.log(request.url, {
    userAgent: userAgent,
    isMobile: request.headers.get('sec-ch-ua-mobile'),
    platform: request.headers.get('sec-ch-ua-platform'),
  });

  // const options = {
  //   v: 2,
  //   // tid: `${process.env.GA_ACCOUNT}`,
  //   gtm: 'a64e392f914fbb0fb2f065aad16be630',
  //   _p: 1,
  //   cid: clientId,
  //   ul: 'en-gb',
  //   sr: '1980x1080',
  //   uaa: 'arm',
  //   uab: '64',
  //   uafvl: request.headers.get('user-agent'),
  //   uamb: request.headers.get('sec-ch-ua-mobile'),
  //   uam: '',
  //   uap: request.headers.get('sec-ch-ua-platform'),
  //   uapv: '14.6.1',
  //   uaw: 0,
  //   _s: 0,
  //   sid: Math.random(),
  //   sct: 1,
  //   seg: 1,
  //   dl: request.url,
  //   dr: request.headers.get('referrer'),
  //   dt: 'spirekey',
  //   en: 'page_view',
  //   _et: '1000',
  //   _ss: 1,
  // };

  // const data = JSON.stringify({
  //   client_id: clientId, // A unique client identifier
  //   user_id: clientId, // A unique client identifier
  //   events: [
  //     {
  //       name: 'page_view',
  //       params: {
  //         page_title: 'Spirekey',
  //         page_location: request.url,
  //         time_to_section: 123456,
  //         send_page_view: true,
  //         ...options,
  //       },
  //     },
  //   ],
  // });

  // const optionsString = Object.entries(options)
  //   .map(([key, val]) => {
  //     return `${key}=${val}`;
  //   })
  //   .join('&');

  // await fetch(
  //   `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_ACCOUNT}&api_secret=${process.env.GA_ACCOUNT_API}&${encodeURI(optionsString)}`,
  //   {
  //     method: 'POST',
  //     body: data,
  //   },
  // );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|.*\\.png$).*)'],
};
