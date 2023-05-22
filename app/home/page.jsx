"use client"

import { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { redirectToAuthCodeFlow } from '../login/page';
import { Amatic_SC } from 'next/font/google';
 
const amatic = Amatic_SC({
  weight: '700',
  subsets: ['latin'],
});

const redirectURI = 'https://amirfest-suljkanovicamir.vercel.app/home';


async function getAccessToken(clientId, code) {

  const verifier = localStorage.getItem("verifier");

  const bodyParams = new URLSearchParams();
  bodyParams.append('client_id', clientId);
  bodyParams.append('grant_type', 'authorization_code');
  bodyParams.append('code', code);
  bodyParams.append('redirect_uri', redirectURI);
  bodyParams.append('code_verifier', verifier);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: bodyParams.toString()
  });

  const { access_token, expires_in  } = await result.json();

  setCookie(null, 'accessToken', access_token, {
    maxAge: expires_in,
    path: '/',
  });

  return access_token;
}

async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me/top/artists?limit=30", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

async function fetchName(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}





export default function Home() {

const [profileData, setProfileData] = useState([])
const [userName, setUserName] = useState([])


useEffect(() => {

  async function fetchData() {
    
    const clientId = 'bebdc78d50e64a2fb888375a178c01d0';
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    
    const cookies = parseCookies();
    let accessToken = cookies.accessToken;
    
    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      if (!accessToken || accessToken === 'undefined') {
        // Access token not found, fetch a new one
        accessToken = await getAccessToken(clientId, code);
        console.log(accessToken)
      }
      const profile = await fetchProfile(accessToken);
      const name = await fetchName(accessToken);

      setProfileData(profile.items)
      setUserName(name.display_name)
    }

  }
  fetchData()
  
},[])

useEffect(() => {
  console.log(profileData)
}, [profileData]);


  return (
    <main  >
      <div className='background'>
      
      <div className='city'>
      <h2 className={amatic.className}>{userName}fest</h2>
      <div className='artists'>
          <h1>
            {profileData?.length > 0 && profileData[0].name}
          </h1>
            <ul>
              {profileData?.slice(3, 12).map((stats, index) => (
                <li key={index}>{stats.name} </li>
              ))}
            </ul>
          </div>
          <div className='artists'>
        <h1>
          {profileData?.length > 0 && profileData[1].name}
        </h1>
        
            <ul>
              {profileData?.slice(12, 21).map((stats, index) => (
                <li key={index}>{stats.name}</li> 
              ))}
            </ul>
          </div>
          <div className='artists'>
        <h1>
          {profileData?.length > 0 && profileData[2].name}
        </h1>
        <ul>
          {profileData?.slice(21, 30).map((stats, index) => (
            <li key={index}>{stats.name}</li>
          ))}
          </ul>
        </div>
      </div>
      </div>
    </main>
  )
}

