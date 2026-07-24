export default function fetchApi(dataValue) {
  const dashboardContent = document.getElementById("dashboard-content");
  const BODY = document.getElementsByTagName("body")[0];
  dashboardContent.innerHTML =
    dashboardContent.innerHTML +
    `<div class = "dashboard w-auto">Loading...<div>`;

  fetch(
    `https://fakestoreapi.com/${
      dataValue === "Categories"
        ? "products/categories"
        : dataValue.toLowerCase()
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);

      const TOTAL = document.querySelector(".dashboard h4");
      TOTAL.innerHTML = TOTAL.innerHTML + json.length;

      const wAuto = document.getElementsByClassName("w-auto")[0];
      const table = document.createElement("table");
      const tBody = document.createElement("tbody");
      wAuto.innerHTML = "";
      tBody.innerHTML = getHeading(
        dataValue === "Users"
          ? { a: "Name", b: "UserName", c: "E-Mail" }
          : dataValue === "Products"
          ? { a: "Title", b: "Price", c: "Image" }
          : { a: "Categories" }
      );
      json.map((element) => {
        if (dataValue === "Users") {
          const { firstname, lastname } = element.name;
          element.fullName = `${firstname} ${lastname}`;
          const { city, street, number } = element.address;
          element.userAddress = `${city} ${street} ${number}`;

          user(element, tBody);
        } else if (dataValue === "Products") {
          const { rate, count } = element.rating;
          element.allRating = `${rate} ${count}`;
          products(element, tBody);
        } else {
          categories(element, tBody);
        }

        return element;
      });
      wAuto.appendChild(table);
      table.appendChild(tBody);
      if (dataValue === "Users" || dataValue === "Products") {
        const COMPLETE_DETAILS = [
          ...document.getElementsByClassName("complete-details"),
        ];

        const userProfile = document.createElement("div");
        userProfile.classList.add("user-profile");
        BODY.appendChild(userProfile);
        COMPLETE_DETAILS.map((el, index) =>
          el.addEventListener("click", (e) => {
            userProfile.style.display = "block";
            const {
              id,
              fullName,
              username,
              email,
              password,
              phone,
              userAddress,
              title,
              description,
              price,
              category,
              allRating,
              image,
            } = json[index];
            const NAME = dataValue === "Users" ? fullName : title;
            const DESC = dataValue === "Users" ? username : description;
            const PRICE = dataValue === "Users" ? email : price;
            const CATEGORY = dataValue === "Users" ? password : category;
            const RATING = dataValue === "Users" ? phone : allRating;
            const IMAGE = dataValue === "Users" ? userAddress : image;

            userProfile.innerHTML = `
            <i class="fa-solid fa-xmark"></i>
            <div class="user-profile-row"><h2>ID:</h2><p>${id}</p></div>
            <div class="user-profile-row"><h2>${
              dataValue === "Users" ? "Name" : `Title`
            }:</h2><p>${NAME}</p></div>
            <div class="user-profile-row"><h2>${
              dataValue === "Users" ? "UserName" : `Description`
            }:</h2><p>${DESC}</p></div>
            <div class="user-profile-row"><h2>${
              dataValue === "Users" ? "E-Mail" : `Price`
            }:</h2><p>${PRICE}</p></div>
            <div class="user-profile-row"><h2>${
              dataValue === "Users" ? "Password" : `Category`
            }:</h2><p>${CATEGORY}</p></div>
            <div class="user-profile-row"><h2>${
              dataValue === "Users" ? "Phone no" : `Title`
            }:</h2><p>${RATING}</p></div>
            <div class="user-profile-row"><h2>${
              dataValue === "Users" ? "Address" : `Image`
            }:</h2>${
              dataValue === "Users" ? `<p>${IMAGE}</p>` : `<img src="${IMAGE}">`
            }</div>
            `;
            const CLOSE_USER_PROFILE =
              document.getElementsByClassName("fa-xmark")[0];
            CLOSE_USER_PROFILE.addEventListener(
              "click",
              () => (userProfile.style.display = "none")
            );
          })
        );
      }
    });

  function user({ fullName, username, email }, element) {
    element.innerHTML =
      element.innerHTML + getRow({ a: fullName, b: username, c: email });
  }

  function products({ title, price, image }, element) {
    element.innerHTML =
      element.innerHTML + getRow({ a: title, b: price, c: image });
  }

  function categories(string, element) {
    element.innerHTML = element.innerHTML + getRow({ a: string });
  }

  function getRow({ a, b, c }) {
    return `<tr><td><div><div ${
      dataValue === "Users" || dataValue === "Products"
        ? "class='complete-details'"
        : ""
    }>${a}</div></div></td>${
      dataValue === "Categories"
        ? ""
        : `<td><div><div>${b}</div></div></td><td><div>${
            dataValue === "Products" ? `<img src="${c}">` : `<div>${c}</div>`
          }</div></td>`
    }</tr>`;
  }

  function getHeading({ a, b, c }) {
    return `<tr><th><div><div>${a}</div></div></th>${
      dataValue === "Categories"
        ? ""
        : `<th><div><div>${b}</div></div></th><th><div><div>${c}</div></div></th>`
    }</tr>`;
  }
}
