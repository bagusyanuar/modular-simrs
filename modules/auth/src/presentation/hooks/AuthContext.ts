import { createContext } from "react"

export interface AuthUser {
  id: string
  nama: string
  email: string
  username: string
  accessToken: string
}

export interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (user: AuthUser) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)