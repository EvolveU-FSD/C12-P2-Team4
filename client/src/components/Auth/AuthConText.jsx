import { createContext, useState } from "react"

export const AuthContext = createContext(null)

export const AuthProvider = ({ chlidren }) => {
  const [auth, setAuth] = useState(null)
  console.log(`AuthProvider auth token: ${auth}`)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {chlidren}
    </AuthContext.Provider>
  )
}
