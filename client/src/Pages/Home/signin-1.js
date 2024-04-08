//----------------- SIGNIN LOGIC --------------------//
//                  MODAL CONTROL                   //
document
  .getElementById("openSignInModal")
  .addEventListener("click", function () {
    document.getElementById("signInModal").style.display = "flex"
  })

document.querySelectorAll(".close").forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    this.closest(".modal").style.display = "none"
  })
})

////             SIGNIN FORM HANDLING            ////
document
  .getElementById("signInForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault() // Prevent the default form submission

    try {
      const username = document.getElementById("signInUsername").value
      const password = document.getElementById("signInPassword").value

      //---------- COLLECT RESPONSE --------------//
      const response = await fetch("/api/signin", {
        method: "POST", // Change method to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send username and password as JSON in the request body
      })
      //---------- CHECK FOR SUCCESS --------//
      if (response.ok) {
        const data = await response.json()
        document.getElementById("signInModal").style.display = "none"
        console.log(data)
      } else {
        const errorData = await response.json()
        alert(errorData.error) // Display error message
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.", error) // Display error message
    }

    // Close the modal after submission
    document.getElementById("signInModal").style.display = "none"
  })
