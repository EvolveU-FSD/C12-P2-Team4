import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../Auth/AuthProvider"

function UserProfile() {
  const { auth } = useContext(AuthContext)
  // console.log("from profile auth:", auth)
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    address: "",
    password: "",
  })
  const [loadError, setLoadError] = useState(null)

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: auth.email }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          username: data.username,
          address: data.address,
          bio: data.bio,
          password: data.password,
        })
      } else {
        const errorData = await response.json()
        setLoadError(errorData)
        alert(errorData.error)
      }
    } catch (error) {
      console.error("Error:", error)
      setLoadError(error)
      alert("An error occurred. Please try again.", error) // Display error message
    }
  }

  useEffect(() => {
    fetchUser().then(() => {
      console.log("fetching.....", user.lastname)
    })
  }, [])
  console.log("UserProfile :", user.firstname)
  console.log("UserProfile: ", user)
  return (
    <div>
      {loadError && <div>Error: {loadError.message}</div>}

      <div className="text-base font-semibold leading-7 justify-center text-green-300">
        <div className="px-4 sm:px-0">
          <h3>{user.username && <span>PROFILE</span>}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-200">
            User Information
          </p>
        </div>
        <div className="font-medium text-indigo-300 hover:text-indigo-500 cursor-pointer">
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name : {user.firstname}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span>Firstname: {user.firstname}</span>
              </dd>
            </div>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Place Holder Address
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Place holder Email
              </dd>
            </div>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Bio
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Place Holder Bio
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Password
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Change Password
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
export default UserProfile
