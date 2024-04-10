import "../../Pages/Home/landing.css"
// import "../../Pages/Home/signup-1"

export default function SignUp() {
  return (
    <>
      <a id="openSignUpModal" className="openModal">
        <i className="fas fa-user-plus"></i>
      </a>
      <div id="signUpModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h2>Sign Up</h2>
          <form id="signUpForm">
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  )
}
