// import { Router } from "react-router-dom"

export default async function getAllUsers() {
  const allUsersResponse = await fetch("/api/users")
  if (!allUsersResponse.ok) {
    console.log(allUsersResponse)
    throw new Error(`Cannot find users. Status ${allUsersResponse.status}`)
  }
  return allUsersResponse.json()
}

export async function getUserById(id) {
  const userResponse = await fetch(`/api/profile/${id}`)
  console.log(userResponse)
  if (!userResponse.ok) {
    console.log(userResponse)
    throw new Error(`An error occurred. Status: ${userResponse.status}`)
  }
  console.log(`User: ${userResponse}`)
  return userResponse.json()
}

export async function updateUser(update) {
  const updateResponse = await fetch("/api/profile", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  })
  if (updateResponse.status !== 200) {
    console.log(updateResponse)
    throw new Error(
      `Unable to edit user information..Try again or contact client care. Error: ${updateResponse.status}`
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
