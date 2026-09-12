// Domain configuration for Enlazer multi-domain architecture
export const DOMAIN_CONFIG = {
  MARKETING_DOMAIN: 'enlazer.com.ng',
  APP_DOMAIN: 'www.enlazer.cloud'
};

/**
 * Returns full URL for marketing landing page & marketing assets (enlazer.com.ng)
 */
export const getMarketingDomainUrl = (path = '/') => {
  if (typeof window === 'undefined') return path;
  const hostname = window.location.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${window.location.protocol}//${DOMAIN_CONFIG.MARKETING_DOMAIN}${cleanPath}`;
};

/**
 * Returns full URL for app dashboard & digital profiles (www.enlazer.cloud / enlazer.cloud)
 */
export const getAppDomainUrl = (path = '/dashboard') => {
  if (typeof window === 'undefined') return path;
  const hostname = window.location.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (hostname === 'enlazer.cloud') {
    return `${window.location.protocol}//enlazer.cloud${cleanPath}`;
  }
  return `${window.location.protocol}//${DOMAIN_CONFIG.APP_DOMAIN}${cleanPath}`;
};

/**
 * Checks if current request is on app domain (enlazer.cloud / www.enlazer.cloud)
 */
export const isAppDomain = () => {
  if (typeof window === 'undefined') return true;
  const hostname = window.location.hostname.toLowerCase();
  if (
    hostname === 'enlazer.cloud' ||
    hostname === 'www.enlazer.cloud' ||
    hostname.endsWith('.enlazer.cloud')
  ) {
    return true;
  }
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
    return true;
  }
  return false;
};

/**
 * Checks if current request hostname is marketing domain (enlazer.com.ng)
 */
export const isMarketingDomain = () => {
  if (typeof window === 'undefined') return false;
  return !isAppDomain();
};

