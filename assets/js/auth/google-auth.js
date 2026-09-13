(() => {
  const cache = new Map();

  const waitForGoogle = () => new Promise((resolve, reject) => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (window.google?.accounts?.oauth2) {
        clearInterval(timer);
        resolve(window.google.accounts.oauth2);
        return;
      }
      if (Date.now() - started > 10000) {
        clearInterval(timer);
        reject(new Error('Google Identity Services is unavailable.'));
      }
    }, 100);
  });

  const requestToken = async ({ clientId, scope, prompt = 'consent' }) => {
    if (!clientId || !scope) throw new Error('Google OAuth is not configured.');
    const oauth2 = await waitForGoogle();
    const key = `${clientId}|${scope}`;

    return new Promise((resolve, reject) => {
      let client = cache.get(key);
      const callback = (response) => {
        if (!response || response.error || !response.access_token) {
          reject(new Error('Google authorization was cancelled or did not return an access token.'));
          return;
        }
        resolve(response.access_token);
      };

      if (!client) {
        client = oauth2.initTokenClient({
          client_id: clientId,
          scope,
          callback,
          error_callback: () => reject(new Error('Google authorization is unavailable.'))
        });
        cache.set(key, client);
      } else {
        client.callback = callback;
        client.error_callback = () => reject(new Error('Google authorization is unavailable.'));
      }

      client.requestAccessToken({ prompt });
    });
  };

  window.KasemGoogleAuth = Object.freeze({ requestToken });
})();
