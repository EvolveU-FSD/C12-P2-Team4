import React from "react"
import UserProfile from "../UserProfile/UserProfile"

const Profile = ({ UserProfile }) => {
  try {
    return (
      <div>
        <h2>User Profile</h2>
        <div>
          <label>First Name:</label>
          <span>{UserProfile.firstname}</span>
        </div>
        <div>
          <label>Last Name:</label>
          <span>{UserProfile.lastname}</span>
        </div>
        <div>
          <label>Username:</label>
          <span>{UserProfile.username}</span>
        </div>
        <div>
          <label>Email:</label>
          <span>{UserProfile.email}</span>
        </div>
      </div>
    )
  } catch (e) {
    return console.log(`Profile encountered error ${e}`)
  }
}

export default Profile
