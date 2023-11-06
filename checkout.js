//***********************************/
//*        CHECKOUT APP
//***********************************/
window.addEventListener("load", () => {
  calculateTotalPrices();
});

//! CONSTANTS
const SHIPPING_PRICE = 25.99;
const FREE_SHIPPING_LIMIT = 3000;
const TAX_RATE = 0.18;

const deleteProducts = document.querySelector(".delete-div .fa-trash-can");
const products = document.querySelector(".products");

//? Delete Products button event
deleteProducts.addEventListener("click", (e) => {
  if (confirm("Silmek istedigine emin misiniz?")) {
    products.innerHTML = "No product";
    products.classList.add("no-product");
    e.target.parentNode.style.display = "none";

    // while (products.hasChildNodes()) {
    //   products.firstChild.remove();
    // }
    // const par = document.createElement("p")
    // par.textContent ="No products left!"
    // products.appendChild(par)
  }
});

products.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-minus")) {
    if (e.target.nextElementSibling.textContent > 1) {
      e.target.nextElementSibling.textContent--;
      calculatePrices(e.target);
    }
  } else if (e.target.classList.contains("fa-plus")) {
    e.target.previousElementSibling.textContent++;
    calculatePrices(e.target);
  } else if (e.target.classList.contains("fa-trash-can")) {
    if (confirm("silmek istiyor musun")) {
      e.target.closest(".product").remove();
      calculatePrices(e.target);
      if (document.querySelector("#selected-price").textContent == 0) {
        products.innerHTML = "No product";
        products.classList.add("no-product");
        e.target.parentNode.style.display = "none";
      }
    }
  }
});

const calculatePrices = (btn) => {
  const discountedPrice = btn
    .closest(".product-info")
    .querySelector("#discounted-price").textContent;

  const quantity = btn.parentNode.querySelector("#quantity").textContent;

  let productPrice = btn
    .closest(".buttons-div")
    .querySelector("#product-price");
  productPrice.innerText = (discountedPrice * quantity).toFixed(2);

  calculateTotalPrices();
};

const calculateTotalPrices = () => {
  const productPrices = document.querySelectorAll("#product-price");
  productPrices.forEach((price) => console.log(price.textContent));
  const sum = [...productPrices].reduce(
    (sum, price) => sum + Number(price.textContent),
    0
  );
  console.log(sum);
  document.querySelector("#selected-price").textContent = sum.toFixed(2);

  const shipping_price =
    sum.toFixed(2) >= FREE_SHIPPING_LIMIT || sum === 0 ? 0 : SHIPPING_PRICE;

  document.querySelector("#shipping").textContent = shipping_price.toFixed(2);

  const taxPrice = sum * TAX_RATE;
  const total_price = (taxPrice + shipping_price + sum).toFixed(2);
  document.querySelector("#tax").textContent = taxPrice.toFixed(2);
  document.querySelector("#total").textContent = total_price;
};
