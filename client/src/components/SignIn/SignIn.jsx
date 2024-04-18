import { useContext, useState } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import "./signin.css"

const UserSignIn = () => {
  const { setAuth } = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  const toggleModal = () => setModalOpen(!modalOpen)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignIn = async (event) => {
    event.preventDefault()
    const { username, password } = credentials

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setAuth({ email: data.email, accessToken: data.accessToken })
        toggleModal()
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Signin Error:", error)
      alert("A SignIn error occurred. Please try again.")
    }
  }

  return (
    <>
      <button id="openSignInModal" className="openModal" onClick={toggleModal}>
        <i className="fa-solid fa-right-to-bracket text-3xl"></i>
      </button>

      {modalOpen && (
        <div id="signInModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
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
                value={credentials.username}
                onChange={handleChange}
              />
              <label htmlFor="signInPassword">Password:</label>
              <input
                type="password"
                id="signInPassword"
                name="password"
                required
                minLength="9"
                maxLength="64"
                value={credentials.password}
                onChange={handleChange}
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
