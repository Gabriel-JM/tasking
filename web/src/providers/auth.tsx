import React, { createContext, useContext, useState } from 'react'
import { User } from '../protocols'

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
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [user, setUser] = useState({} as User)
  
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
