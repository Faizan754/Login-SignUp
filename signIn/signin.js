const form = document.getElementsByClassName("user-form")[0];
const data = JSON.parse(localStorage.getItem("users"));
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(email.value, password.value);
  const userData = data.find(
    (item) => item.email === email.value && item.password === password.value
  );

  if (userData) {
    localStorage.setItem("currentUser", userData.id);
    window.location.href = "../dashboard/index.html";
  } else alert("Please check your E-mail and Password again.");
});
