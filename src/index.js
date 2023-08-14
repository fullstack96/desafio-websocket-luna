const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const handlebars = require("express-handlebars");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const productManager = require("./productManager.js");
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);

app.get("/", (req, res) => {
  productManager.getAll().then((products) => {
    res.render("home.hbs", { title: "Home", products });
  });
});

app.get("/realtimeproducts", (req, res) => {
  productManager.getAll().then((products) => {
    res.render("realtimeproducts.hbs", {
      title: "Real Time Products",
      products,
    });
  });
});

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  productManager.getAll().then((products) => {
    socket.emit("productsList", products);
  });

  socket.on("newProduct", async (product) => {
    await productManager.addFile(product);
    const products = await productManager.getAll();
    io.emit("productAdded", products);
  });

  socket.on("deleteProduct", async (id) => {
    const did = Number(id);
    const newProducts = await productManager.deleteById(did);
    await io.emit("productDeleted", newProducts);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});