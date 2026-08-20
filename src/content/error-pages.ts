export interface ErrorPageContent {
  status: number;
  eyebrow: string;
  title: string;
  message: string;
}

const statusCopy: Record<number, Omit<ErrorPageContent, 'status'>> = {
  400: {
    eyebrow: 'Request Error',
    title: 'Bad request.',
    message: 'The request could not be understood. Check the address or return to a known page.',
  },
  401: {
    eyebrow: 'Authorization Required',
    title: 'Access needs approval.',
    message: 'This resource requires authorization before it can be viewed.',
  },
  402: {
    eyebrow: 'Request Restricted',
    title: 'Payment required.',
    message: 'This request cannot be completed under its current access requirements.',
  },
  403: {
    eyebrow: 'Access Restricted',
    title: 'Access denied.',
    message: 'You do not have permission to view this resource.',
  },
  404: {
    eyebrow: 'Lost in the Field',
    title: 'Page not found.',
    message: "The page you're looking for does not exist, has moved or is no longer available.",
  },
  405: {
    eyebrow: 'Method Error',
    title: 'Method not allowed.',
    message: 'That action is not supported at this address.',
  },
  408: {
    eyebrow: 'Connection Delayed',
    title: 'Request timed out.',
    message: 'The request took too long to complete. Try again when the connection is stable.',
  },
  409: {
    eyebrow: 'Request Conflict',
    title: 'Something conflicted.',
    message: 'The request conflicts with the current state of this resource.',
  },
  410: {
    eyebrow: 'Archive Notice',
    title: 'This page is gone.',
    message: 'This resource has been permanently removed and no replacement is available.',
  },
  413: {
    eyebrow: 'Request Limit',
    title: 'Request too large.',
    message: 'The submitted request is larger than this service can process.',
  },
  415: {
    eyebrow: 'Format Error',
    title: 'Unsupported media.',
    message: 'The submitted format is not supported by this service.',
  },
  418: {
    eyebrow: 'Protocol Note',
    title: 'Request refused.',
    message: 'This request reached an endpoint that cannot complete it.',
  },
  422: {
    eyebrow: 'Validation Error',
    title: 'Content cannot be processed.',
    message: 'The request was understood, but some of its information could not be processed.',
  },
  429: {
    eyebrow: 'Traffic Limit',
    title: 'Too many requests.',
    message: 'Too many requests arrived in a short period. Wait a moment before trying again.',
  },
  451: {
    eyebrow: 'Availability Notice',
    title: 'Content unavailable.',
    message: 'This resource is unavailable because of a legal restriction.',
  },
  500: {
    eyebrow: 'Site Error',
    title: 'Something went off course.',
    message: 'The site encountered an unexpected problem. Try again or return to the homepage.',
  },
  501: {
    eyebrow: 'Feature Notice',
    title: 'Not implemented.',
    message: 'This service does not currently support the requested functionality.',
  },
  502: {
    eyebrow: 'Network Error',
    title: 'Bad gateway.',
    message: 'A service needed to complete this request returned an invalid response.',
  },
  503: {
    eyebrow: 'Service Notice',
    title: 'Temporarily unavailable.',
    message: 'The service is unavailable right now. Please try again shortly.',
  },
  504: {
    eyebrow: 'Network Delay',
    title: 'Gateway timed out.',
    message: 'A service needed to complete this request did not respond in time.',
  },
  505: {
    eyebrow: 'Protocol Error',
    title: 'HTTP version not supported.',
    message: 'This browser or request uses an HTTP version that the site cannot support.',
  },
  507: {
    eyebrow: 'Storage Error',
    title: 'Insufficient storage.',
    message: 'The service does not currently have enough storage to complete this request.',
  },
  508: {
    eyebrow: 'Routing Error',
    title: 'Loop detected.',
    message: 'The request entered a processing loop and could not be completed safely.',
  },
  511: {
    eyebrow: 'Network Access',
    title: 'Authentication required.',
    message: 'The network requires authentication before this request can continue.',
  },
};

export function getErrorPageContent(status: number): ErrorPageContent | null {
  if (!Number.isInteger(status) || status < 400 || status > 599) return null;

  const configured = statusCopy[status];
  if (configured) return { status, ...configured };

  return status < 500
    ? {
        status,
        eyebrow: 'Request Error',
        title: 'Request could not be completed.',
        message: 'The server could not complete this request. Check the address or return to a known page.',
      }
    : {
        status,
        eyebrow: 'Service Error',
        title: 'Service could not respond.',
        message: 'The service encountered a problem while processing this request. Please try again.',
      };
}
