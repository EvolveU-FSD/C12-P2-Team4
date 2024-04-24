import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../Auth/AuthProvider"

function UserProfile() {
  const { auth } = useContext(AuthContext)
  console.log("1. from userprofile auth:", auth)
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    address: "",
    password: "",
    _id: "",
  })
  const [loadError, setLoadError] = useState(null)

  const fetchUser = async () => {
    try {
      console.log("Sending request with:.....", auth._id)
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
        body: JSON.stringify({ email: auth.email }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Data received:", data)
        setUser({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          username: data.username || "",
          email: data.email || "",
          address: data.address || "",
          bio: data.bio || "",
          password: data.password || "",
        })
      } else {
        const errorData = await response.json()
        setLoadError(errorData)
        alert(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error:", error)
      setLoadError(error)
      alert(`An error occurred. Please try again. ${error}`)
    }
  }

  useEffect(() => {
    fetchUser().then(() => {
      console.log("Fetch complete for:", auth.email)
    })
  }, [auth.email, auth._id])
  console.log("UserProfile auth _id :....", auth._id)
  console.log("UserProfile: ", user)
  return (
    <div>
      {loadError && <div>Error: {loadError.message}</div>}

      <div className="text-3xl font-bold leading-7 justify-center text-primary-red ">
        <div className="px-4 sm:px-0">
          <h1>{user.username && <span>PROFILE</span>}</h1>
        </div>

        <div className="mt-6 border-t border-gray-100 rounded-3xl">
          {/* <dl className="divide-y divide-gray-100"> */}
          <div className="bg-gray-50 rounded-2xl px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name :
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span>{user.firstname + " " + user.lastname}</span>
            </dd>
          </div>
          <div className="bg-[#ECECEC] px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                className="bg-[#ECECEC] w-full h-auto cursor-pointer"
                placeholder="Click to Enter your current Address..."
              />
            </dd>
          </div>
          <div className="rounded-2xl bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.email}
            </dd>
          </div>
          <div className="bg-[#ECECEC] px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Traveller Bio
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                className="w-full h-auto bg-[#ECECEC] cursor-pointer"
                placeholder="Click to enter your Traveller's Bio..."
              />
            </dd>
          </div>
          <div className="bg-gray-50 rounded-2xl px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Password
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Change Password
            </dd>
          </div>
          {/* </dl> */}
        </div>
      </div>
    </div>
  )
}
export default UserProfile
