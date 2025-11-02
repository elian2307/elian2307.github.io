const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const quantityInput = document.getElementById("quantity");
const smallSizeBtn = document.getElementById("small-size");
const largeSizeBtn = document.getElementById("large-size");
const priceCurrent = document.querySelector(".price .current");
const priceOld = document.querySelector(".price .old");
const discountText = document.querySelector(".price .discount");

let basePrice = 20;
let smallPrice = 15;
let maxCantidad = 15;
let minCantidad = 1;

function updatePrice() {
  let quantity = parseInt(quantityInput.value) || 1;
  let unitPrice = largeSizeBtn.classList.contains("active") ? basePrice : smallPrice;
  let subtotal = unitPrice * quantity;
  let discount = 0;

  if (quantity >= 10) {
    discount = 0.20;
  } else if (quantity >= 5) {
    discount = 0.10;
  }

  let total = subtotal - subtotal * discount;

  priceCurrent.textContent = `$${total.toFixed(2)}`;
  priceOld.textContent = discount > 0 ? `$${subtotal.toFixed(2)}` : "";
  discountText.textContent = discount > 0 ? `${discount * 100}% OFF` : "";
}

increaseBtn.addEventListener("click", () => {
  let value = parseInt(quantityInput.value) || 1;
  if (value < maxCantidad) {
    quantityInput.value = value + 1;
    updatePrice();
  }
});

decreaseBtn.addEventListener("click", () => {
  let value = parseInt(quantityInput.value) || 1;
  if (value > minCantidad) {
    quantityInput.value = value - 1;
    updatePrice();
  }
});

function selectSize(selectedBtn) {
  smallSizeBtn.classList.remove("active");
  largeSizeBtn.classList.remove("active");
  selectedBtn.classList.add("active");

  updatePrice();
}

smallSizeBtn.addEventListener("click", () => selectSize(smallSizeBtn));
largeSizeBtn.addEventListener("click", () => selectSize(largeSizeBtn));

updatePrice();
