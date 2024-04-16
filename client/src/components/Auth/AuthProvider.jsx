import { createContext, useState } from "react"

// Create context
export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  console.log(`AuthProvider auth token: ${auth}`)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
