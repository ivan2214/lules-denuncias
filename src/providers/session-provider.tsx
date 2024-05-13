"use client"

import {SessionProvider} from "next-auth/react"
import {useEffect, useState} from "react"

export interface AuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({children}: AuthProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <SessionProvider>{children}</SessionProvider>
}
