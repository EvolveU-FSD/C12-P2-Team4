// SIGNIN LOGIC

document
  .getElementById("openSignInModal")
  .addEventListener("click", function () {
    document.getElementById("signInModal").style.display = "block";
  });

document
  .getElementById("openSignUpModal")
  .addEventListener("click", function () {
    document.getElementById("signUpModal").style.display = "block";
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

document
  .getElementById("signInForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // You can add your sign-in logic here

    // For demonstration purposes, let's just log the username and password
    const username = document.getElementById("signInUsername").value;
    const password = document.getElementById("signInPassword").value;

    console.log("Sign In Username:", username);
    console.log("Sign In Password:", password);

    // Close the modal after submission
    document.getElementById("signInModal").style.display = "none";
  });

document
  .getElementById("signUpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // You can add your sign-up logic here

    // For demonstration purposes, let's just log the username and password
    const username = document.getElementById("signUpUsername").value;
    const password = document.getElementById("signUpPassword").value;

    console.log("Sign Up Username:", username);
    console.log("Sign Up Password:", password);

    // Close the modal after submission
    document.getElementById("signUpModal").style.display = "none";
  });
