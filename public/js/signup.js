//---------------- SIGNUP LOGIC ------------------//
document
  .getElementById("openSignUpModal")
  .addEventListener("click", function () {
    document.getElementById("signUpModal").style.display = "flex";
  });

document.querySelectorAll(".close").forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    this.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});

//-------------- FORM HANDLING -------------------//
document
  .getElementById("signUpForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const formData = new FormData(this); // Get form data

      // Construct an object from FormData
      const formDataObject = {};
      for (const [key, value] of formData.entries()) {
        formDataObject[key] = value;
      }

      //---------- COLLECT RESPONSE --------------//
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject), // Convert FormData object to JSON
      });
      //---------- CHECK FOR SUCCESS --------//
      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Display success message
        document.getElementById("signUpModal").style.display = "none";
      } else {
        const errorData = await response.json();
        alert(errorData.error); // Display error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again."); // Display generic error message
    }
  });
