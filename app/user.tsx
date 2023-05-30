'use client'

import { useSession } from "next-auth/react"

const User = () => {
    const {data: session} = useSession()
    console.log("CLIENT SESSION ", session);
    
  return (
    <pre>{JSON.stringify(session)}</pre>
  )
}

export default User