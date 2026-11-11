import { menuArray } from "./data.js";
import addBtnUrl from "./images/add-btn.svg";

const completeOrderSection = document.querySelector(".complete-order");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal__form");

let orderArray = [];

document.addEventListener("click", function (e) {
  const addBtn = e.target.closest("[data-add]");
  if (addBtn) {
    handleAddClick(addBtn.dataset.add);
  }

  const removeBtn = e.target.closest("[data-remove]");
  if (removeBtn) {
    handleRemoveClick(removeBtn.dataset.remove);
  }

  const completeBtn = e.target.closest("[data-complete]");
  if (completeBtn) {
    handleCompleteOrder();
  }
});

modalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const customerName = new FormData(modalForm).get("name");
  handlePayment(customerName);
});

function handleAddClick(id) {
  const menuItemId = Number(id);
  const menuItem = menuArray.find((item) => item.id === menuItemId);
  orderArray.push(menuItem);
  completeOrderSection.classList.add("hidden");
  renderOrder();
}

function handleRemoveClick(index) {
  const orderItemIndex = Number(index);
  orderArray.splice(orderItemIndex, 1);
  renderOrder();
}

function handleCompleteOrder() {
  modal.classList.remove("hidden");
  document.querySelector("#name").focus();
}

function handlePayment(customerName) {
  orderArray = [];
  modal.classList.add("hidden");
  modalForm.reset();
  completeOrderSection.classList.remove("hidden");
  completeOrderSection.textContent = `Thanks, ${customerName}! Your order is on its way!`;
  renderOrder();
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
            <img src="${addBtnUrl}" alt="" width="50" height="50" />
          </button>
        </article>
  `;
  });
  return menuArrayItems.join("");
}

function getOrderHtml() {
  const orderList = orderArray.map((item, index) => {
    return `
     <li class="order__item">
       <p class="order__name">${item.name}</p>
       <button class="order__remove" aria-label="Remove ${item.name} from order" data-remove="${index}">remove</button>
       <p class="order__price">$${item.price}</p>
     </li>
     `;
  });
  return orderList.join("");
}

function getTotalPrice() {
  return orderArray.reduce((acc, curr) => acc + curr.price, 0);
}

function renderOrder() {
  document
    .querySelector(".order")
    .classList.toggle("hidden", orderArray.length === 0);
  document.querySelector(".order__list").innerHTML = getOrderHtml();

  document.querySelector(".order__total-price").textContent =
    "$" + getTotalPrice();
}

function render() {
  document.querySelector(".menu").innerHTML = getMenuHtml();
}

render();
