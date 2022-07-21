// import config from '../config';

import config from '../config';

interface CookieOptions {
  secure?: boolean;
  httpOnly: boolean;
  sameSite?: boolean | 'strict' | 'lax' | 'none';
  expires: Date | undefined;
  path?: string;
}

// max age one week
const maxCookieAge = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = (expiry: Date = new Date(Date.now() + maxCookieAge)) => {
  const options: CookieOptions = {
    secure: config.environment === 'dev' ? false : true,
    sameSite: 'none',
    httpOnly: true,
    expires: expiry,
  };

  return options;
};

export { cookieOptions };
