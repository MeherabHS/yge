import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/(4\d{2}|5\d{2})$/);
  if (!match) return NextResponse.next();

  const status = Number(match[1]);
  const destination = request.nextUrl.clone();
  destination.pathname = `/status/${status}`;

  const renderedPage = await fetch(destination, {
    cache: 'no-store',
    headers: {
      accept: 'text/html',
      'accept-language': request.headers.get('accept-language') ?? 'en',
      cookie: request.headers.get('cookie') ?? '',
      'user-agent': request.headers.get('user-agent') ?? 'YGE error renderer',
    },
  });
  const headers = new Headers(renderedPage.headers);

  headers.delete('content-encoding');
  headers.delete('content-length');
  headers.delete('transfer-encoding');
  headers.set('cache-control', 'no-store');
  headers.set('x-robots-tag', 'noindex, nofollow');

  return new NextResponse(renderedPage.body, { headers, status });
}

export const config = {
  matcher: '/:status',
};
