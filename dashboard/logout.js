export default function logOut(dataValue) {
  const logOut = document.getElementById("logout");

  logOut.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("currentUser", 0);
    window.location.replace(`${dataValue ? "../" : ""}../signIn`);
  });
}
