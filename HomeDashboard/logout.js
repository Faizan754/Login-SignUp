const logOut = document.getElementById("logout");

logOut.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("../LoginDashboard");
});
