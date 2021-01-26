import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../protocols'
import loginService from '../services/login'

interface AuthContextProps {
  children: React.ReactNode
}

interface AuthContextValue {
  isAuth: boolean
  isAuthLoading: boolean
  user: User
  signIn(user: User): void
  signOut(): void
}

const AuthContext = createContext({} as AuthContextValue)
export const useAuth = () => useContext(AuthContext)

const storageKey = 'tasking@token'
export function AuthProvider({ children }: AuthContextProps) {
  const [isAuth, setIsAuth] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [user, setUser] = useState({} as User)

  useEffect(() => {
    async function refreshUser() {
      if(!localStorage.getItem(storageKey)) {
        return setIsAuthLoading(false)
      }

      const token = localStorage.getItem(storageKey) as string
      const { ok, data } = await loginService.refresh(token)

      if(ok) {
        signIn(data)
      }
    }

    refreshUser()
  })
  
  function signIn(user: User) {
    setUser(user)
    setIsAuth(true)
    localStorage.setItem(storageKey, user.token)
  }

  function signOut() {
    setUser({} as User)
    setIsAuth(false)
    localStorage.removeItem(storageKey)
  }

  const data = {
    isAuth,
    isAuthLoading,
    user,
    signIn,
    signOut
  }
  
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}
