import { useEffect, useState } from "react"
import { updateUser } from "../../api"

// function UserRow({ user, setSelectedUserId }) {
//     const userClicked = () => { setSelectedUserId(user._id) }

//     return <div onClick={userClicked}> { user.name } </div>
// }

function UpdateUser() {
  const [updatedUserInfo, setUpdatedUser] = useState({ name: "", team: "" })
  const [updatedUserName, setUpdatedUserName] = useState("")
  const [updatedTeamName, setUpdatedTeamName] = useState("")
  const [loadError, setLoadError] = useState()

  async function updateUser(updatedUserInfo) {
    try {
      const updatedUserInfo = await updateUser(updatedUserInfo)
      setUpdatedUser(updatedUserInfo)
    } catch (error) {
      setLoadError(error)
    }
  }

  useEffect(() => {
    updateUser(updatedUserInfo)
  }, [])

  return (
    <div>
      <h1>Update a User!</h1>
      {loadError && <div>Error: {loadError.message}</div>}
      <div>
        Updated name:
        <input
          type="text"
          value={updatedUserName}
          onChange={(e) => setUpdatedUserName(e.target.value)}
        />
      </div>
      <div>
        Updated team:
        <input
          type="text"
          value={updatedTeamName}
          onChange={(e) => setUpdatedTeamName(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() =>
            updateUser({ name: updatedUserName, team: updatedTeamName })
          }
        >
          Update User
        </button>
      </div>
    </div>
  )
}

export default UpdateUser
