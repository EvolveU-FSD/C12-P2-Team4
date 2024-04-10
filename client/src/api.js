export async function getAllUsers() {
  const allUsersResponse = await fetch("/api/users")
  if (allUsersResponse.status !== 200) {
    console.log(allUsersResponse)
    throw Error("Cannot find users")
  }
  return allUsersResponse.json()
}

export async function getUserById(userId) {
  const userResponse = await fetch(`/api/user/${userId}`)
  if (userResponse.status !== 200) {
    console.log(userResponse)
    throw Error("Invalid user information...")
  }
  return userResponse.json()
}

export async function updateUser(update) {
  const updateResponse = await fetch("/api/user", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  })
  if (updateResponse.status !== 200) {
    console.log(updateResponse)
    throw Error(
      "Unable to edit user information..Try again or contact client care."
    )
  }
}

export async function deleteUser() {
  const deleteResponse = await fetch("/api/user", {
    method: "delete",
  })
  if (deleteResponse.status !== 200) {
    console.log(deleteResponse)
    throw Error("Unable to Delete user. Try again or contact support...")
  }
}
