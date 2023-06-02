export async function fetchAccessToken(code: string) {
  const clientId = '7814d95ad24f4c998373425cb72a1ae3';
  const redirectUri = 'http://localhost:3000';
  const codeVerifier = localStorage.getItem('code_verifier');

  console.log('codeVerifier', codeVerifier)

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier || '',
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  })

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Response data:', errorData);
    throw new Error(`HTTP status ${response.status}`);
  }

  const data = await response.json();

  // Save refresh token in local storage
  if (data.refresh_token) {
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  return data.access_token || ''
}

export async function refreshAccessToken(refreshToken: string) {
  const clientId = '7814d95ad24f4c998373425cb72a1ae3';

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Response data:', errorData);
    throw new Error(`HTTP status ${response.status}`);
  }

  const data = await response.json();

  // Save refresh token in local storage
  if (data.refresh_token) {
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  return data.access_token || ''
}
