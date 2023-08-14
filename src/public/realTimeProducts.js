const socket = io();

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const status = document.getElementById("status").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const img = document.getElementById("img").value;

  const product = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    img,
  };

  console.log(product);

  socket.emit("newProduct", product);
});

function deleteProduct(id) {
  console.log(id);
  socket.emit("deleteProduct", id);
}

socket.on("productsList", (products) => {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = "";
  products.forEach((product) => {
    productsList.innerHTML += `<div id="${product.id}"><p>Product: ${product.title}</p><p>Price: ${product.price}</p>   
    <button onclick="deleteProduct('${product.id}')">Eliminar producto</button>
    </div>`;
  });

  socket.on("productAdded", (newProduct) => {
    productsList.innerHTML += `<div id="${newProduct.id}"><p>Product: ${newProduct.title}</p><p>Price: ${newProduct.price}</p>   
    <button onclick="deleteProduct('${newProduct.id}')">Eliminar producto</button>
    </div>`;
  });

  socket.on("productDeleted", (id) => {
    const product = document.getElementById(id);
    if (product) {
      product.remove();
    }
  });
});