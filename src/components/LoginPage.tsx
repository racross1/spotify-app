import { useEffect } from 'react'

function generateRandomString(length: number) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(arrayBuffer: ArrayBuffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer) as any) as string)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}

export default function LoginPage() {
  const clientId = '7814d95ad24f4c998373425cb72a1ae3';
  const redirectUri = 'http://localhost:3000';
  // const scopes = 'user-read-private user-read-email';

  useEffect(() => {
    // Clear the refresh_token and code_verifier from local storage
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('code_verifier');
  }, []);

  async function initiatePKCEFlow() {
    console.log("initPKCE flow")
      // Generate a new code verifier for each authorization request
      const codeVerifier = generateRandomString(128);
      
      // Store codeVerifier in local storage to use it in the token exchange process
      localStorage.setItem('code_verifier', codeVerifier);
      console.log("codeVerifier that was just stored",codeVerifier)

      // Create code challenge
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      // Generate state
      const state = generateRandomString(16);

      // Redirect user to Spotify authorization page
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}&state=${state}`;

      // window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${encodeURIComponent(scopes)}`;

    }

  return  <div className="login-page">
      <button onClick={() => {
      console.log("Button clicked");
      initiatePKCEFlow();
      }}>
        Login with Spotify
      </button>
    </div>;
}
