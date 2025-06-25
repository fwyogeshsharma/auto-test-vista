// src/pages/Auth.tsx
import { useEffect } from 'react';
import CryptoJS from 'crypto-js';

const Auth = () => {
  useEffect(() => {
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem('codeVerifier', codeVerifier);

    const clientChallenge = generateCodeChallenge(codeVerifier);
    const clientState = generateRandomString(5);
    const nonce = generateRandomString(10);
    const username = 'demoUser'; // optional: could be dynamic

    localStorage.setItem('username', username);

    const authorizationUrl = `http://pintailer.com:9000/oauth2/authorize?client_id=oidc-client&redirect_uri=http://localhost:4200/callback&scope=openid api.read api.write&response_type=code&response_mode=query&code_challenge_method=S256&code_challenge=${clientChallenge}&state=${clientState}&nonce=${nonce}`;

    window.location.href = authorizationUrl;
  }, []);

  return null;
};

export default Auth;

// Helpers
const generateCryptoRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const generateCodeVerifier = (): string => {
  return generateCryptoRandomString(128);
};

const generateCodeChallenge = (codeVerifier: string): string => {
  const sha256 = CryptoJS.SHA256(codeVerifier);
  return base64URL(sha256);
};

const base64URL = (wordArray: CryptoJS.lib.WordArray): string => {
  return wordArray
    .toString(CryptoJS.enc.Base64)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const generateRandomString = (len: number, charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string => {
  let randomString = '';
  for (let i = 0; i < len; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};
