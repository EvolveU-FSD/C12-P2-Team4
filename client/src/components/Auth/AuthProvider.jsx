import { createContext, useState } from "react"

// Create context
export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  console.log(`AuthProvider auth token: ${auth.email}`)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
