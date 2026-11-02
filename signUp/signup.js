const form = document.getElementsByClassName("user-form")[0];
const formBtn = document.getElementById("button");
// form.setAttribute("required", true);
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password.value === confirmPassword.value) {
    const newData = JSON.parse(localStorage.getItem("users"));
    const data = newData || [];

    if (
      data &&
      data.find((item) => {
        return item.email === email.value;
      })
    ) {
      alert("Email already taken!");
    } else {
      const formData = new FormData(form);
      const obj = {};

      for (let keyValues of formData.entries()) {
        obj[keyValues[0]] = keyValues[1];
      }
      obj.id = Math.random();

      data.push(obj);

      localStorage.setItem("users", JSON.stringify(data));
      window.location.href = "../signIn/index.html";
    }
  } else alert("Please re-check your password");
});
