"use client"

import Image from "next/image"
import FestivalImg from '../public/City.svg'
import SpotifyImg from '../public/spotify.svg'
import Link from "next/link"

export default function Home() {

  return (
    <main>
      <div className="home-div">
        <div className="img-div">
          <Image src={FestivalImg} alt="festival" />
        </div>
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

