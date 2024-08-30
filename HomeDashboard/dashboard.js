const profile = document.getElementsByClassName("fa-user")[0];
const logOutBtn = document.getElementById("logout");
let toggle = true;

profile.addEventListener("click", () => {
  if (toggle) logOutBtn.style.display = "block";
  else logOutBtn.style.display = "none";

  toggle = !toggle;
});
