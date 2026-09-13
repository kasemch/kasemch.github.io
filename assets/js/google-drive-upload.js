(() => {
  const root = document.querySelector('[data-upload-center]');
  const config = window.KASEM_DOCUMENT_STORAGE_CONFIG;
  if (!root || !config?.enabled || !config.clientId) return;

  const input = root.querySelector('[data-upload-file]');
  const button = root.querySelector('[data-store-document]');
  const status = root.querySelector('[data-storage-status]');
  let classification = null;
  let tokenClient = null;
  let accessToken = null;

  const folderForCategory = (category) => {
    const map = {
      Teaching: config.folders.teaching,
      Research: config.folders.research,
      Publications: config.folders.publications,
      Curriculum: config.folders.curriculum_quality,
      'Quality Assurance': config.folders.curriculum_quality,
      'Academic Service': config.folders.academic_service,
      Projects: config.folders.projects,
      Other: config.folders.inbox
    };
    return map[category] || config.folders.inbox;
  };

  const setStatus = (message, isError = false) => {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = isError ? 'error' : 'ok';
  };

  const requestToken = () => new Promise((resolve, reject) => {
    if (!window.google?.accounts?.oauth2) {
      reject(new Error('Google Identity Services is not available.'));
      return;
    }

    if (!tokenClient) {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: config.clientId,
        scope: config.scope,
        callback: (response) => {
          if (response.error) {
            reject(new Error(response.error));
            return;
          }
          accessToken = response.access_token;
          resolve(accessToken);
        }
      });
    } else {
      tokenClient.callback = (response) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }
        accessToken = response.access_token;
        resolve(accessToken);
      };
    }

    tokenClient.requestAccessToken({ prompt: accessToken ? '' : 'consent' });
  });

  const verifyFolderAccess = async (folderId, token) => {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(folderId)}?fields=id,name,mimeType,capabilities(canAddChildren)`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) return false;
    const folder = await response.json();
    return folder.mimeType === 'application/vnd.google-apps.folder' && folder.capabilities?.canAddChildren !== false;
  };

  const uploadMultipart = async (file, folderId, token) => {
    const boundary = `kasem_${crypto.randomUUID()}`;
    const metadata = { name: file.name, parents: [folderId] };
    const body = new Blob([
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`,
      JSON.stringify(metadata),
      `\r\n--${boundary}\r\nContent-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`,
      file,
      `\r\n--${boundary}--`
    ]);

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,parents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`
      },
      body
    });

    if (!response.ok) {
      throw new Error(`Drive upload failed (${response.status}).`);
    }
    return response.json();
  };

  window.addEventListener('kasem:upload-classified', (event) => {
    classification = event.detail;
    if (button) button.disabled = !classification?.file;
  });

  button?.addEventListener('click', async () => {
    const file = classification?.file || input?.files?.[0];
    if (!file || !classification) return;

    button.disabled = true;
    setStatus('Requesting Google Drive permission…');

    try {
      const token = accessToken || await requestToken();
      const folderId = folderForCategory(classification.category);
      const canUseFolder = await verifyFolderAccess(folderId, token);

      if (!canUseFolder) {
        throw new Error('The OAuth app cannot access the configured destination folder. Storage remains fail-closed.');
      }

      const uploaded = await uploadMultipart(file, folderId, token);
      setStatus(`Stored in Google Drive: ${uploaded.name}`);
      root.dispatchEvent(new CustomEvent('kasem:document-stored', {
        bubbles: true,
        detail: {
          driveFile: uploaded,
          classification: { ...classification, file: undefined }
        }
      }));
    } catch (error) {
      setStatus(error.message || 'Upload failed.', true);
    } finally {
      button.disabled = false;
    }
  });
})();
