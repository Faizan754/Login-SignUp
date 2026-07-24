import fetchApi from "./fetch.js";
import logOut from "./logout.js";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const body = document.querySelector("body");
const dataValue = body.dataset.value;
const layoutData = !dataValue
  ? [
      { i: "Dashboard", total: "dashboard" },
      { i: "Users", total: "users" },
      { i: "Products", total: "products" },
      { i: "Categories", total: "categories" },
    ]
  : [{ i: dataValue }];

if (!currentUser) {
  window.location.replace(`${dataValue ? "../" : ""}../signin`);
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
    layoutCards({ i: element.i, total: element.total });
  }

  dataValue && fetchApi(dataValue);

  function layoutCards({ i, total }) {
    dashboardCards.insertAdjacentHTML(
      `beforeend`,
      `<div class="dashboard" data-name="${total}">
      <h1>${i}</h1>
      <h4 id="total-${total}">Total: </h4>
      </div>`,
    );

    // dashboardCards.innerHTML += cardHTML;
    getTotalLength(total);
  }

  function getTotalLength(totalType) {
    const DASHBOARD_CARDS = document.getElementById(`total-${totalType}`);

    if (totalType === "dashboard") {
      Promise.all([
        fetch("https://fakestoreapi.com/users").then((res) => res.json()),
        fetch("https://fakestoreapi.com/products").then((res) => res.json()),
        fetch("https://fakestoreapi.com/products/categories").then((res) =>
          res.json(),
        ),
      ])
        .then(([users, products, categories]) => {
          const total = users.length + products.length + categories.length;
          DASHBOARD_CARDS.innerHTML = `Total: ${total}`;
        })
        .catch(() => {
          DASHBOARD_CARDS.innerHTML = `Total: N/A`;
        });
    } else {
      fetch(
        `https://fakestoreapi.com/${
          totalType === "categories" ? "products/categories" : totalType
        }`,
      )
        .then((res) => res.json())
        .then((json) => {
          DASHBOARD_CARDS.innerHTML = `Total: ${json.length}`;
          console.log(DASHBOARD_CARDS.innerHTML);
        })
        .catch(() => {
          DASHBOARD_CARDS.innerHTML = `Total: N/A`;
        });
    }
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
  }">Dashboard</a></li>
  <li><a class="link ${dataValue === "Users" && "active"}" href="${
    dataValue ? (dataValue === "Users" ? "" : "../users/") : "users"
  }">Users</a></li>
  <li><a class="link ${dataValue === "Products" && "active"}" href="${
    dataValue ? (dataValue === "Products" ? "" : "../products/") : "products/"
  }">Products</a></li>
  <li><a class="link ${dataValue === "Categories" && "active"}" href="${
    dataValue
      ? dataValue === "Categories"
        ? ""
        : "../categories/"
      : "categories/"
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
