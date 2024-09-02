export default function fetchApi(dataValue) {
  const dashboardContent = document.getElementById("dashboard-content");

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
        dataValue === "Users"
          ? user(element, tBody)
          : dataValue === "Products"
          ? products(element, tBody)
          : categories(element, tBody);
      });
      wAuto.appendChild(table);
      table.appendChild(tBody);
    });

  function user({ name, username, email }, element) {
    const { firstname, lastname } = name;
    const fullName = `${firstname} ${lastname}`;
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
    return `<tr><td><div><div>${a}</div></div></td>${
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
