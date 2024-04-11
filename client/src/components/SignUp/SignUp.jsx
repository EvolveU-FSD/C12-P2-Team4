import { useState } from "react"

import "../Signin/signin.css"

export default function SignUp() {
  const [modalOpen, setModalOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const handleSignUp = async (event) => {
    event.preventDefault() // Prevent the default form submission

    try {
      const response = await fetch("/api/signup", {
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
      <a onClick={openModal} id="openSignUpModal" className="openModal">
        <i className="fas fa-user-plus text-center text-3xl"></i>
      </a>

      {modalOpen && (
        <div id="signUpModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Sign Up</h2>
            <form id="signUpForm" onSubmit={handleSignUp}>
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                minLength="2"
                maxLength="20"
              />
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                minLength="2"
                maxLength="20"
              />
              <label htmlFor="signUpUsername">Username:</label>
              <input
                type="text"
                id="signUpUsername"
                name="username"
                required
                minLength="6"
                maxLength="32"
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                minLength="6"
                maxLength="32"
              />
              <label htmlFor="signUpPassword">Password:</label>
              <input
                type="password"
                id="signUpPassword"
                name="password"
                required
                minLength="9"
                maxLength="64"
              />
              <button onClick={handleSignUp} type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
