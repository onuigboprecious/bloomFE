// Domain configuration for Enlazer multi-domain architecture
export const DOMAIN_CONFIG = {
  MARKETING_DOMAIN: 'enlazer.com.ng',
  APP_DOMAIN: 'enlazer.cloud'
};

/**
 * Returns full URL for marketing landing page & marketing assets (enlazer.com.ng)
 */
export const getMarketingDomainUrl = (path = '/') => {
  if (typeof window === 'undefined') return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // If on enlazer.com.ng or local/preview environment, return current origin
  return `${window.location.origin}${cleanPath}`;
};

/**
 * Returns full URL for app dashboard & digital profiles
 */
export const getAppDomainUrl = (path = '/dashboard') => {
  if (typeof window === 'undefined') return path;
  const hostname = window.location.hostname.toLowerCase();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // If explicitly on enlazer.cloud domain, preserve enlazer.cloud
  if (hostname === DOMAIN_CONFIG.APP_DOMAIN || hostname.endsWith(`.${DOMAIN_CONFIG.APP_DOMAIN}`)) {
    return `${window.location.protocol}//${DOMAIN_CONFIG.APP_DOMAIN}${cleanPath}`;
  }

  // Default to current active origin (e.g. https://enlazer.com.ng)
  return `${window.location.origin}${cleanPath}`;
};

/**
 * Checks if current request is on app domain or serving single-page app
 */
export const isAppDomain = () => {
  if (typeof window === 'undefined') return true;
  return true;
};

/**
 * Checks if current request hostname is marketing domain
 */
export const isMarketingDomain = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.toLowerCase() === DOMAIN_CONFIG.MARKETING_DOMAIN;
};

