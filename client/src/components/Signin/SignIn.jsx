import { useState } from "react"

import "./signin.css"

const UserSignIn = () => {
  const [modalOpen, setModalOpen] = useState(false)
  // const [form, setForm] = useState({
  //   username:"",
  //   password:"",
  //
  // })
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const handleSignIn = async (event) => {
    event.preventDefault() // Prevent the default form submission

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send username and password as JSON in the request body
      })

      if (response.ok) {
        const data = await response.json()
        closeModal() // Close the modal on success
        console.log(data) // Log or handle the response data
      } else {
        const errorData = await response.json()
        alert(errorData.error) // Display error message from response
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.") // Display error message
    }
  }

  return (
    <>
      <a id="openSignInModal" className="openModal" onClick={openModal}>
        <i className=" fas fa-sign-in-alt text-3xl"></i>
      </a>

      {modalOpen && (
        <div id="signInModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Sign In</h2>
            <form id="signInForm" onSubmit={handleSignIn}>
              <label htmlFor="signInUsername">Username:</label>
              <input
                type="text"
                id="signInUsername"
                name="username"
                required
                minLength="6"
                maxLength="32"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="signInPassword">Password:</label>
              <input
                type="password"
                id="signInPassword"
                name="password"
                required
                minLength="9"
                maxLength="64"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UserSignIn
