import { getAppDomainUrl } from '../config/domainConfig';

export const saveContactToPhone = async (customContact) => {
  if (!customContact) return;

  const name = customContact.name || 'Contact';
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const handleUrl = customContact.username
    ? getAppDomainUrl(`/@${customContact.username}`)
    : (customContact.website || customContact.profileUrl || getAppDomainUrl('/'));

  const vCardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${name}`,
    `TITLE:${customContact.title || customContact.role || ''}`,
    `ORG:${customContact.company || ''}`,
    `TEL;TYPE=CELL,VOICE:${customContact.phone || ''}`,
    `EMAIL;TYPE=INTERNET:${customContact.email || ''}`,
    `URL:${handleUrl}`,
    `NOTE:${customContact.bio || customContact.notes || 'Saved from Enlazer Smart NFC Card'}`,
    'END:VCARD'
  ];

  const vCardString = vCardLines.join('\r\n');
  const fileName = `${name.replace(/\s+/g, '_')}.vcf`;
  const file = new File([vCardString], fileName, { type: 'text/vcard;charset=utf-8' });

  // 1. Primary: Native OS Share Sheet / Web Share API
  if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `Save ${name} to Contacts`,
        text: `Contact details for ${name}`,
      });
      return;
    } catch (err) {
      if (err.name === 'AbortError') return; // User canceled native share
    }
  }

  // 2. Secondary: Backend Inline vCard URL Navigation
  const username = customContact.username;
  if (username) {
    const backendUrl = import.meta.env.VITE_API_URL || 'https://bloombe.onrender.com';
    const vcardEndpoint = `${backendUrl}/api/vcard/@${username}`;
    window.location.href = vcardEndpoint;
    return;
  }

  // 3. Fallback: Direct Data URI navigation
  const encodedVcard = encodeURIComponent(vCardString);
  window.location.href = `data:text/vcard;charset=utf-8,${encodedVcard}`;
};

export const generateRawVCardString = (customContact) => {
  if (!customContact) return '';
  const handleUrl = customContact.username
    ? getAppDomainUrl(`/@${customContact.username}`)
    : (customContact.website || customContact.profileUrl || getAppDomainUrl('/'));

  const nameParts = (customContact.name || '').trim().split(' ');
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const firstName = nameParts[0] || '';

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${customContact.name || ''}`,
    `TITLE:${customContact.title || customContact.role || ''}`,
    `ORG:${customContact.company || ''}`,
    `TEL;TYPE=CELL,VOICE:${customContact.phone || ''}`,
    `EMAIL;TYPE=INTERNET:${customContact.email || ''}`,
    `URL:${handleUrl}`,
    `NOTE:${customContact.bio || customContact.notes || 'Saved from Enlazer Smart NFC Card'}`,
    'END:VCARD'
  ].join('\r\n');
};

export const exportMultipleVCards = (contacts) => {
  if (!contacts || contacts.length === 0) return;

  const rawString = contacts.map(c => generateRawVCardString(c)).join('\r\n');
  const blob = new Blob([rawString], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Enlazer_Contacts_Export_${new Date().toISOString().slice(0, 10)}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
