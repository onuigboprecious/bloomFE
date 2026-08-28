export const saveContactToPhone = (customContact) => {
  if (!customContact) return;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const profileUrl = customContact.website || customContact.profileUrl || origin;
  const nameParts = (customContact.name || '').trim().split(' ');
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const firstName = nameParts[0] || '';

  const vCardData = [
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

  const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = `${(customContact.name || 'Contact').replace(/\s+/g, '_')}.vcf`;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 500);
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
    `URL:${handleUrl}`,
    `NOTE:${customContact.bio || customContact.notes || 'Saved from Bloom Smart NFC Card'}`,
    'END:VCARD'
  ].join('\r\n');
};
