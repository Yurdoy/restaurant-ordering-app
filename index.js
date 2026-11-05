import { menuArray } from "./data.js";

let orderArray = [];

document.addEventListener("click", function (e) {
  const addBtn = e.target.closest("[data-add]");

  if (addBtn) {
    handleAddClick(addBtn.dataset.add);
  }
});

function handleAddClick(id) {
  const menuItemId = Number(id);
  console.log(menuItemId, typeof menuItemId);
  const menuItem = menuArray.find((item) => item.id === menuItemId);
  console.log(menuItem);
  orderArray.push(menuItem);
  console.log(orderArray);
}

function getMenuHtml() {
  const menuArrayItems = menuArray.map((item) => {
    return `
        <article class="menu-item">
          <span class="menu-item__emoji" aria-hidden="true">${item.emoji}</span>
          <div class="menu-item__info">
            <h2 class="menu-item__title">${item.name}</h2>
            <p class="menu-item__description">
              ${item.ingredients.join(", ")}
            </p>
            <p class="menu-item__price">$${item.price}</p>
          </div>
          <button class="menu-item__button" aria-label="Add ${item.name} to order" data-add="${item.id}">
            <img src="./images/add-btn.svg" alt="" width="50" height="50" />
          </button>
        </article>
  `;
  });
  return menuArrayItems.join("");
}

function render() {
  document.querySelector(".menu").innerHTML = getMenuHtml();
}

render();
