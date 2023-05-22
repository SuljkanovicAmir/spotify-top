"use client"

import { useEffect, useState } from 'react';

const clientId = 'bebdc78d50e64a2fb888375a178c01d0';
const redirectURI = 'https://amirfest-suljkanovicamir.vercel.app/home';



async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const base64Url = base64ArrayBuffer(digest);
    return base64Url.replace(/=+$/, '');
  }
  
  function base64ArrayBuffer(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    const base64 = Buffer.from(bytes).toString('base64');
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  function generateCodeVerifier(length) {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  }


  export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);  

    localStorage.setItem('verifier', verifier );

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectURI);
    params.append("scope", "user-read-private user-read-email user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);


    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
  }


const LoginPage = () => {
    useEffect(() => {
      redirectToAuthCodeFlow(clientId)
    }, []);


    return <div className='login'>Redirecting to Spotify login...</div>;
  };

  
  export default LoginPage;