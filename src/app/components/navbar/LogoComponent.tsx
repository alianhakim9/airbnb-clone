"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

function LogoComponent() {

  const router = useRouter()

  return (
    <div>
      <Image src={'/images/logo.png'} alt="Airbnb logo" width={100} height={100} className="hover:cursor-pointer" onClick={() => router.push('/')} priority />
    </div>
  )
}

export default LogoComponent