(() => {
  const root = document.querySelector('[data-upload-center]');
  const config = window.KASEM_DOCUMENT_STORAGE_CONFIG || {};
  if (!root || !config.enabled || !config.clientId || !window.KasemGoogleAuth) return;

  const button = root.querySelector('[data-store-document]');
  const status = root.querySelector('[data-storage-status]');
  const confirmation = root.querySelector('[data-upload-confirm]');
  let classification = null;

  const setStatus = (message, state = 'idle') => {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state;
  };

  const folderForCategory = (category) => ({
    Teaching: config.folders.teaching,
    Research: config.folders.research,
    Publications: config.folders.publications,
    'Curriculum & Quality': config.folders.curriculum_quality,
    'Academic Service': config.folders.academic_service,
    Projects: config.folders.projects,
    Other: config.folders.inbox
  })[category] || config.folders.inbox;

  const verifyFolder = async (folderId, token) => {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(folderId)}?fields=id,name,mimeType,capabilities(canAddChildren)`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error(`Drive destination verification failed (${response.status}).`);
    const folder = await response.json();
    if (folder.mimeType !== 'application/vnd.google-apps.folder' || folder.capabilities?.canAddChildren === false) {
      throw new Error('The configured Google Drive destination is not writable by the authorized account.');
    }
    return folder;
  };

  const uploadMultipart = async (file, folderId, token) => {
    const boundary = `kasem_${crypto.randomUUID()}`;
    const body = new Blob([
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`,
      JSON.stringify({ name: file.name, parents: [folderId] }),
      `\r\n--${boundary}\r\nContent-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`,
      file,
      `\r\n--${boundary}--`
    ]);
    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,parents,mimeType,size', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`
      },
      body
    });
    if (!response.ok) throw new Error(`Google Drive upload failed (${response.status}). No success state was recorded.`);
    const uploaded = await response.json();
    if (!uploaded?.id) throw new Error('Google Drive did not return a verified file ID.');
    return uploaded;
  };

  window.addEventListener('kasem:upload-classified', (event) => {
    classification = event.detail;
    if (button) button.disabled = !classification?.file || !confirmation?.checked;
  });

  window.addEventListener('kasem:upload-invalid', () => {
    classification = null;
    if (button) button.disabled = true;
  });

  confirmation?.addEventListener('change', () => {
    if (button) button.disabled = !classification?.file || !confirmation.checked;
  });

  button?.addEventListener('click', async () => {
    if (!classification?.file || !confirmation?.checked) return;
    button.disabled = true;
    setStatus('Requesting Google Drive authorization…');
    try {
      const token = await window.KasemGoogleAuth.requestToken({
        clientId: config.clientId,
        scope: config.scope,
        prompt: 'consent'
      });
      const folderId = folderForCategory(classification.category);
      const folder = await verifyFolder(folderId, token);
      setStatus(`Uploading to ${folder.name}…`);
      const uploaded = await uploadMultipart(classification.file, folderId, token);
      setStatus(`Stored in Google Drive: ${uploaded.name}`, 'ok');
      root.dispatchEvent(new CustomEvent('kasem:document-stored', {
        bubbles: true,
        detail: {
          driveFile: uploaded,
          classification: { ...classification, file: undefined },
          admissionStatus: 'NOT_ADMITTED',
          createsSystemAuthority: false
        }
      }));
    } catch (error) {
      setStatus(error?.message || 'Upload failed. No success state was recorded.', 'error');
    } finally {
      button.disabled = !classification?.file || !confirmation?.checked;
    }
  });
})();
