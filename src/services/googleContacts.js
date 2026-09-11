/**
 * Google People API Service
 * Handles OAuth 2.0 Token authentication and Google People API contacts integration.
 */

const PEOPLE_API_ENDPOINT = 'https://people.googleapis.com/v1/people:createContact';
const GOOGLE_DISCOVERY_USERINFO = 'https://www.googleapis.com/oauth2/v3/userinfo';

/**
 * Format an Enlazer lead object into a Google People API Contact Person resource
 */
export const formatLeadToGoogleContact = (lead) => {
  const nameParts = (lead.name || '').trim().split(' ');
  const givenName = nameParts[0] || '';
  const familyName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  const contactObj = {
    names: [
      {
        givenName,
        familyName,
        displayName: lead.name || ''
      }
    ]
  };

  if (lead.email) {
    contactObj.emailAddresses = [{ value: lead.email, type: 'work' }];
  }

  if (lead.phone) {
    contactObj.phoneNumbers = [{ value: lead.phone, type: 'mobile' }];
  }

  if (lead.company || lead.role || lead.title) {
    contactObj.organizations = [
      {
        name: lead.company || '',
        title: lead.role || lead.title || '',
        current: true
      }
    ];
  }

  if (lead.notes || lead.note || lead.bio) {
    contactObj.biographies = [
      {
        value: lead.notes || lead.note || lead.bio || 'Saved from Enlazer NFC Card',
        contentType: 'TEXT_PLAIN'
      }
    ];
  }

  return contactObj;
};

/**
 * Send a POST request to Google People API to create a contact
 */
export const createGoogleContact = async (lead, accessToken) => {
  if (!accessToken) {
    throw new Error('Google Access Token is required to sync contacts.');
  }

  const payload = formatLeadToGoogleContact(lead);

  const response = await fetch(PEOPLE_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || `Google API error (${response.status})`);
  }

  return data;
};

/**
 * Fetch connected Google account user profile details
 */
export const getGoogleUserProfile = async (accessToken) => {
  try {
    const res = await fetch(GOOGLE_DISCOVERY_USERINFO, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch Google user profile:', err);
    return null;
  }
};

/**
 * Load Google Identity Services script dynamically if not present
 */
export const loadGoogleGsiScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
      resolve(window.google.accounts.oauth2);
      return;
    }

    const existingScript = document.getElementById('google-gsi-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google?.accounts?.oauth2));
      existingScript.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google?.accounts?.oauth2);
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });
};

/**
 * Request real Google Contacts OAuth access token via GIS popup
 */
export const requestGoogleContactsToken = async (clientId) => {
  const oauth2 = await loadGoogleGsiScript();
  return new Promise((resolve, reject) => {
    try {
      const client = oauth2.initTokenClient({
        client_id: clientId || (typeof window !== 'undefined' && localStorage.getItem('bloom_google_client_id')) || import.meta.env.VITE_GOOGLE_CLIENT_ID || '297316783483-0shs98r6sdbt8a6s6i911ap6bbqcimf6.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/contacts openid email profile',
        callback: (response) => {
          if (response.error) {
            reject(new Error(response.error_description || response.error));
            return;
          }
          if (response.access_token) {
            resolve(response.access_token);
          } else {
            reject(new Error('No OAuth access token returned by Google'));
          }
        },
      });
      client.requestAccessToken();
    } catch (err) {
      reject(err);
    }
  });
};

