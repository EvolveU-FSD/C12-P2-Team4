import { useEffect, useState, useContext } from "react"
import { getUserById } from "../../api"
import { useParams } from "react-router-dom"
import { AuthContext } from "../Auth/AuthProvider"
function UserProfile() {
  const { auth } = useContext(AuthContext)
  console.log("from profile auth:", auth)
  const [user, setUser] = useState({
    username: "",
    email: "",
  })
  const [loadError, setLoadError] = useState(null)
  const { id } = useParams()

  console.log(`Here with id ${id}`)
  console.log(`User: ${user.username}`)

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: auth.email }), // Send username and password as JSON in the request body
      })

      if (response.ok) {
        const data = await response.json()
        setUser({ email: data.email, username: data.username })
        console.log(data)
        console.log(
          `UserProfile fetchUser response: email: ${data.email}, User Name: ${data.username}`
        ) // Log or handle the response data
      } else {
        const errorData = await response.json()
        alert(errorData.error) // Display error message from response
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.", error) // Display error message
    }
  }

  useEffect(() => {
    // getUserById(id).then(setUser).catch(setLoadError)
    fetchUser()
  }, [])

  // useEffect(() => {
  //   getUserById(id).then(setUser).catch(setLoadError)
  // }, [])

  return (
    <div>
      {loadError && <div>Error: {loadError.message}</div>}
      <div>UserId: {user._id}</div>
      <div>username: {user.username}</div>
      <div>email: {user.email}</div>
    </div>
  )
}
export default UserProfile
