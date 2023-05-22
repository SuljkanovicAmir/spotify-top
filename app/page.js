"use client"

import Image from "next/image"
import SpotifyImg from '../public/spotify.svg'
import Link from "next/link"

export default function Home() {

  return (
    <main>
      <div className="home-div">
        <h1>Create a festival lineup from your top artists.</h1>
        <div className="buttons-div">
          <button>
              <Link href='/login'>
                <Image src={SpotifyImg} alt="spoitfy" height={70} width={70}/>
                Log in with Spotify
              </Link>
            </button>
        </div>
      </div>
    </main>
  )
}

