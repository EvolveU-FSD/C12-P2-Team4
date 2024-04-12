import { useEffect, useState } from "react"
import { getUserById } from "../../api"
import { useParams } from "react-router-dom"

function UserProfile() {
  const [user, setUser] = useState({ username: "", email: "" })
  const [loadError, setLoadError] = useState()
  const { id } = useParams()

  useEffect(() => {
    getUserById(id).then(setUser).catch(setLoadError)
  }, [])

  return (
    <div>
      {loadError && <div>Error: {loadError.message}</div>}
      <div>UserId: {id}</div>
      <div>username: {user.username}</div>
      <div>email: {user.email}</div>
    </div>
  )
}
export default UserProfile
