const socket = io();

socket.on("productsList", (products) => {
  const productsList = document.getElementById("productsList");
  products.forEach((product) => {
    productsList.innerHTML += `<div id="${product.id}"><p>Product: ${product.title}</p><p>Price: ${product.price}</p> </div>`;
  });
});