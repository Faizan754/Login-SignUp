import fetchApi from "./fetch.js";
import logOut from "./logout.js";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const body = document.querySelector("body");
const dataValue = body.dataset.value;
const layoutData = !dataValue
  ? ["Dashboard", "Users", "Products", "Categories"]
  : [dataValue];

if (!currentUser) {
  window.location.replace(`${dataValue ? "../" : ""}../signIn/index.html`);
} else {
  dashboardLayout();

  const profile = document.getElementsByClassName("fa-user")[0];
  const logOutBtn = document.getElementById("logout");
  const user = document.getElementById("current-user");
  const userProfile = document.getElementById("dropdown-email-heading");
  const emailHeading = document.getElementById("email-heading");
  const dashboardCards = document.getElementById("dashboard-cards");

  const users = JSON.parse(localStorage.getItem("users"));
  const screenWidth = window.matchMedia("(max-width: 360px)");

  logOut(dataValue);

  for (let elements of users) {
    if (elements.id === currentUser) user.innerHTML = elements.email;
  }

  let toggle = true;

  profile.addEventListener("click", () => {
    if (toggle) logOutBtn.style.display = "block";
    else logOutBtn.style.display = "none";

    toggle = !toggle;
  });

  getUser();

  function getUser() {
    if (screenWidth.matches) userProfile.appendChild(user);
    else emailHeading.appendChild(user);
  }

  screenWidth.addEventListener("change", () => {
    getUser();
  });

  for (let element of layoutData) {
    layoutCards(element);
  }

  dataValue && fetchApi(dataValue);

  function layoutCards(i) {
    dashboardCards.innerHTML =
      dashboardCards.innerHTML +
      `<div class="dashboard">
    <h1>${i}</h1>
    <h4>Lorem</h4>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae explicabo
      doloremque neque porro nihil officiis minima, fugiat debitis commodi
      delectus!
    </p>
  </div>`;
  }

  function dashboardLayout() {
    body.innerHTML =
      `<img src="${dataValue ? "../" : ""}../GjrkLhP.jpg" alt="" />
  <main id="main">
  <div id="user">
  <div id="email-heading">
  <h1 id="current-user">someone@gmail.com</h1>
  </div>
  <i class="fa-regular fa-user"></i>
  <div id="logout">
  <div id="dropdown-email-heading"></div>
  <a href="">Log Out</a>
  </div>
  </div>
  <section id="main-section">
  <section id="dashboard-links">
  <h1>E-COMMERCE</h1>
  <ul>
  <li><a class="link ${!dataValue && "active"}" href="${
        dataValue ? "../" : ""
      }index.html">Dashboard</a></li>
  <li><a class="link ${dataValue === "Users" && "active"}" href="${
        dataValue ? (dataValue === "Users" ? "" : "../Users/") : "Users/"
      }index.html">Users</a></li>
  <li><a class="link ${dataValue === "Products" && "active"}" href="${
        dataValue
          ? dataValue === "Products"
            ? ""
            : "../Products/"
          : "Products/"
      }index.html">Products</a></li>
  <li><a class="link ${dataValue === "Categories" && "active"}" href="${
        dataValue
          ? dataValue === "Categories"
            ? ""
            : "../Categories/"
          : "Categories/"
      }">Categories</a></li>
          </ul>
        </section>
        <section id="dashboard-content">
          <div id="dashboard-cards">

          </div>
        </section>
      </section>
    </main>
` + body.innerHTML;
  }
}
