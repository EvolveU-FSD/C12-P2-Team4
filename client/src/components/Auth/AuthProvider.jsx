// AuthProvider.js

import React, { createContext, useState, useEffect } from "react"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth))
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("auth")
    setAuth(null)
  }

  const login = (data) => {
    localStorage.setItem("auth", JSON.stringify(data))
    setAuth(data)
  }

  const _id = (data) => {
    localStorage.setItem("auth", JSON.stringify(data))
    setAuth(data)
  }

  return (
    <AuthContext.Provider value={{ auth, _id, login, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
