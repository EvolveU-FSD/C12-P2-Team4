import { useContext, useState } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import "./signin.css" // Assuming sign-up styles are included here as well

const UserAuth = ({ onLogin }) => {
  const { setAuth } = useContext(AuthContext)
  const [modalType, setModalType] = useState(null) // 'signin', 'signup', or null
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  })
  const [loadError, setLoadError] = useState(null)

  const openModal = (type) => {
    setLoadError(null) // Reset errors when opening any modal
    setModalType(type)
  }
  const closeModal = () => {
    setModalType(null)
    setLoadError(null) // Clear errors on modal close
  }

  const handleInputChange = (event, formType) => {
    const { name, value } = event.target
    if (formType === "signup") {
      setSignUpData((prev) => ({ ...prev, [name]: value }))
    } else {
      setCredentials((prev) => ({ ...prev, [name]: value }))
    }
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
        closeModal()
        onLogin()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to sign in")
      }
    } catch (error) {
      console.error("Signin Error:", error)
      alert(error.message)
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to sign up")
      }

      console.log(await response.json()) // Process or log the data
      closeModal() // Close the modal on success
    } catch (error) {
      setLoadError(error.message)
      console.error("SignUp Error:", error)
    }
  }

  return (
    <>
      {modalType === null && (
        <>
          <button className="openModal" onClick={() => openModal("signin")}>
            <i className="fa-solid fa-right-to-bracket text-3xl"></i>
          </button>
          <button className="openModal" onClick={() => openModal("signup")}>
            <i className="fas fa-user-plus text-3xl"></i>
          </button>
        </>
      )}

      {modalType === "signin" && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSignIn}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                minLength="6"
                maxLength="32"
                value={credentials.username}
                onChange={(e) => handleInputChange(e, "signin")}
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength="9"
                maxLength="64"
                value={credentials.password}
                onChange={(e) => handleInputChange(e, "signin")}
              />
              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
      )}

      {modalType === "signup" && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {loadError && <div className="error">{loadError}</div>}
            <form onSubmit={handleSignUp}>
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                minLength="2"
                maxLength="20"
                value={signUpData.firstname}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                minLength="2"
                maxLength="20"
                value={signUpData.lastname}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                minLength="6"
                maxLength="32"
                value={signUpData.username}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                minLength="6"
                maxLength="32"
                value={signUpData.email}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength="9"
                maxLength="64"
                value={signUpData.password}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UserAuth
