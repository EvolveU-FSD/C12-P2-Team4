import { useEffect, useState } from "react"
import { updateUser } from "../api"

function UserRow({ user, setSelectedUserId }) {
  const userClicked = () => {
    setSelectedUserId(user._id)
  }

  return <div onClick={userClicked}> {user.username} </div>
}

function AddUser() {
  const [newUserInfo, setNewUser] = useState({ username: "", email: "" })
  const [newUserName, setNewUserName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [loadError, setLoadError] = useState()

  async function addUser(newUserInfo) {
    try {
      const newUser = await updateUser(newUserInfo)
      setNewUser(newUser)
    } catch (error) {
      setLoadError(error)
    }
  }

  useEffect(() => {
    addUser(newUserInfo)
  }, [])

  return (
    <div>
      <h1>Add a New User!</h1>
      {loadError && <div>Error: {loadError.message}</div>}
      <div>
        Your name:
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
      </div>
      <div>
        Your email:
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => addUser({ username: newUserName, email: newEmail })}
        >
          Create New User
        </button>
      </div>
    </div>
  )
}

export default AddUser
