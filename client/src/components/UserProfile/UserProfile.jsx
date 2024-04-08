import React, { useState, useEffect } from "react"
import Profile from "../Profile/Profile" // Assuming Profile.jsx is in the same directory

const UserProfile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Fetch user data from backend and set it to the state
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5555/api/users/:email")
        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUser()
  }, [])

  return (
    <div>
      {user ? <Profile user={user} /> : <div>Loading user profile...</div>}
    </div>
  )
}

export default UserProfile
