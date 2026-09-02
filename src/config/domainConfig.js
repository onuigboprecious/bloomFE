// Domain configuration for Enlazer multi-domain architecture
export const DOMAIN_CONFIG = {
  MARKETING_DOMAIN: 'enlazer.com.ng',
  APP_DOMAIN: 'enlazer.app'
};

/**
 * Returns full URL for marketing landing page & marketing assets (enlazer.com.ng)
 */
export const getMarketingDomainUrl = (path = '/') => {
  if (typeof window === 'undefined') return path;
  const hostname = window.location.hostname.toLowerCase();

  // Local development / preview support
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
    return path;
  }

  const protocol = window.location.protocol;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${protocol}//${DOMAIN_CONFIG.MARKETING_DOMAIN}${cleanPath}`;
};

/**
 * Returns full URL for app dashboard & digital profiles (enlazer.app)
 */
export const getAppDomainUrl = (path = '/dashboard') => {
  if (typeof window === 'undefined') return path;
  const hostname = window.location.hostname.toLowerCase();

  // Local development / preview support
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
    return path;
  }

  const protocol = window.location.protocol;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${protocol}//${DOMAIN_CONFIG.APP_DOMAIN}${cleanPath}`;
};

/**
 * Checks if current request hostname is enlazer.app domain
 */
export const isAppDomain = () => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname.toLowerCase();

  if (hostname === DOMAIN_CONFIG.APP_DOMAIN || hostname.endsWith(`.${DOMAIN_CONFIG.APP_DOMAIN}`)) {
    return true;
  }

  // Local URL query override parameter (?domain=app) for local testing
  const params = new URLSearchParams(window.location.search);
  if (params.get('domain') === 'app') {
    return true;
  }

  return false;
};

/**
 * Checks if current request hostname is enlazer.com.ng domain
 */
export const isMarketingDomain = () => {
  if (typeof window === 'undefined') return true;
  return !isAppDomain();
};
