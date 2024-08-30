const form = document.getElementsByClassName("user-form")[0];
const formBtn = document.getElementById("button");
// form.setAttribute("required", true);
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password.value === confirmPassword.value) {
    const data = JSON.parse(localStorage.getItem("users"));
    if (
      data &&
      data.find((item) => {
        return item.email === email.value;
      })
    ) {
      alert("Email already taken!");
    } else {
      const formData = new FormData(form);
      // console.log(formData.entries());
      const obj = {};

      for (let keyValues of formData.entries()) {
        obj[keyValues[0]] = keyValues[1];
      }
      obj.id = Math.random();
      console.log(formData.entries());

      let initialArr = [];

      if (data) data.push(obj);
      else initialArr.push(obj);

      localStorage.setItem("users", JSON.stringify(data ? data : initialArr));
    }
  } else alert("Please re-check your password");

  const inputs = [...document.getElementsByTagName("input")];
  inputs.map((input) => (input.value = ""));
});
