import { useEffect, useState } from "react"
import { getUserById } from "../../api"
import { useParams } from "react-router-dom"

function UserProfile() {
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
      const response = await fetch("/api/profile")

      console.log(response)
    } catch (error) {
      console.log(`Error ${error}`)
    }
  }
  useEffect(() => {
    // getUserById(id).then(setUser).catch(setLoadError)
    fetchUser()
  }, [])

  useEffect(() => {
    getUserById(id).then(setUser).catch(setLoadError)
  }, [])

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
