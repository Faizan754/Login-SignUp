function getTotalLength() {
  const DASHBOARD_CARDS = document.querySelector(".dashboard h4");
  console.log(DASHBOARD_CARDS);

  const DATA_NAME = DASHBOARD_CARDS.dataset.name;
  if (DATA_NAME) {
    return fetch(
      `https://fakestoreapi.com/${
        DATA_NAME === "categories" ? "products/categories" : DATA_NAME
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        return (DASHBOARD_CARDS.innerHTML =
          DASHBOARD_CARDS.innerHTML + json.length);
      });
  }
}
