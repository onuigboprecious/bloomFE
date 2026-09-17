import React, { useEffect, useRef } from 'react';

/**
 * Cloudflare Turnstile Widget Component
 * Renders the official Cloudflare Turnstile explicit rendering widget.
 *
 * @param {Object} props
 * @param {string} [props.siteKey] Cloudflare Turnstile sitekey (defaults to env or dummy key)
 * @param {function(string): void} props.onVerify Callback when user passes Turnstile verification
 * @param {function(): void} [props.onError] Callback when verification errors
 * @param {function(): void} [props.onExpire] Callback when token expires
 * @param {string} [props.className] Optional CSS container styles
 */
export const TurnstileWidget = ({
  siteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
  onVerify,
  onError,
  onExpire,
  className = 'my-4 flex justify-center',
}) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  const onVerifyRef = useRef(onVerify);
  const onErrorRef = useRef(onError);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onErrorRef.current = onError;
    onExpireRef.current = onExpire;
  }, [onVerify, onError, onExpire]);

  useEffect(() => {
    // Check if script is already injected
    const scriptId = 'cf-turnstile-script';
    let script = document.getElementById(scriptId);

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && widgetIdRef.current === null) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token) => {
              if (onVerifyRef.current) onVerifyRef.current(token);
            },
            'error-callback': () => {
              if (onErrorRef.current) onErrorRef.current();
            },
            'expired-callback': () => {
              if (onExpireRef.current) onExpireRef.current();
            },
            theme: 'auto',
          });
        } catch (e) {
          console.warn('Turnstile render warning:', e);
        }
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    } else if (window.turnstile) {
      renderWidget();
    } else {
      script.addEventListener('load', renderWidget);
    }

    return () => {
      if (window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // ignore cleanup errors
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} className={className} />;
};
