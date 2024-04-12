import { useState } from "react"
import { useEffect } from "react"

import "../Signin/signin.css"

export default function SignUp() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loadError, setLoadError] = useState()
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const handleSignUp = async (event) => {
    event.preventDefault() // Prevent the default form submission

    console.log(event)
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
        }), // Send username and password as JSON in the request body
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
      setLoadError(error)
      console.error("Error:", error)
      alert("An error occurred. Please try again.") // Display error message
    }
  }

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
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
                onChange={handleChange(setFirstname)}
              />
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                minLength="2"
                maxLength="20"
                onChange={handleChange(setLastname)}
              />
              <label htmlFor="signUpUsername">Username:</label>
              <input
                type="text"
                id="signUpUsername"
                name="username"
                required
                minLength="6"
                maxLength="32"
                onChange={handleChange(setUsername)}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                minLength="6"
                maxLength="32"
                onChange={handleChange(setEmail)}
              />
              <label htmlFor="signUpPassword">Password:</label>
              <input
                type="password"
                id="signUpPassword"
                name="password"
                required
                minLength="9"
                maxLength="64"
                onChange={handleChange(setPassword)}
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
