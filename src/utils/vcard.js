export const saveContactToPhone = async (customContact) => {
  if (!customContact) return;

  const name = customContact.name || 'Contact';
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const profileUrl = customContact.website || customContact.profileUrl || origin;

  const vCardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${name}`,
    `TITLE:${customContact.title || customContact.role || ''}`,
    `ORG:${customContact.company || ''}`,
    `TEL;TYPE=CELL,VOICE:${customContact.phone || ''}`,
    `EMAIL;TYPE=INTERNET:${customContact.email || ''}`,
    `URL:${profileUrl}`,
    `NOTE:${customContact.bio || customContact.notes || 'Saved from Enlazer Smart NFC Card'}`,
    'END:VCARD'
  ];

  const vCardString = vCardLines.join('\r\n');
  const fileName = `${name.replace(/\s+/g, '_')}.vcf`;
  const file = new File([vCardString], fileName, { type: 'text/vcard;charset=utf-8' });

  // 1. Primary: Native OS Share Sheet / Web Share API (Triggers native iOS "Add to Contacts" or Android "Google Contacts")
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

  // 2. Secondary: Backend Inline vCard URL Navigation (Directly triggers OS address book import)
  const username = customContact.username;
  if (username) {
    const backendUrl = import.meta.env.VITE_API_URL || 'https://bloombe.onrender.com';
    const vcardEndpoint = `${backendUrl}/api/vcard/@${username}`;
    window.location.href = vcardEndpoint;
    return;
  }

  // 3. Fallback: Direct Data URI navigation (No forced file download prompt)
  const encodedVcard = encodeURIComponent(vCardString);
  window.location.href = `data:text/vcard;charset=utf-8,${encodedVcard}`;
};

export const generateRawVCardString = (customContact) => {
  if (!customContact) return '';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const profileUrl = customContact.website || customContact.profileUrl || origin;
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
    `URL:${profileUrl}`,
    `NOTE:${customContact.bio || customContact.notes || 'Saved from Bloom Smart NFC Card'}`,
    'END:VCARD'
  ].join('\r\n');
};
