const form = document.getElementsByClassName("user-form")[0];
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password.value === confirmPassword.value) {
    const newData = JSON.parse(localStorage.getItem("users"));
    const data = newData || [];

    if (
      data.find((item) => {
        return item.email === email.value;
      })
    ) {
      alert("Email already taken!");
    } else {
      const newUser = {
        id: Math.random(),
        email: email.value,
        password: password.value,
      };

      data.push(newUser);

      localStorage.setItem("users", JSON.stringify(data));
      window.location.href = "../signIn/index.html";
    }
  } else alert("Please re-check your password");
});
