const express = require("express");
const router = express.Router();
const Contenedor = require("../cartManager");
const products = require("../data/products.json");

router.get("/carts", async (req, res) => {
  const carts = await Contenedor.getAll();
  res.json(carts);
});

router.post("/carts", async (req, res) => {
  try {
    const newCart = {};
    const addCart = await Contenedor.addFile(newCart);
    res.json(addCart);
  } catch (err) {
    return err;
  }
});

router.get("/carts/:cid", async (req, res) => {
  const cid = Number(req.params.cid);
  const cart = await Contenedor.getById(cid);
  if (!cart) {
    res.status(404).send("Cart not found");
  } else {
    const products = cart.products;
    res.json(products);
  }
});

router.post("/carts/:cid/products/:pid", async (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);
  const cart = await Contenedor.getById(cid);
  if (!cart) {
    res.status(404).send("Cart not found");
  } else {
    const product = products.find((p) => p.id === pid);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      if (!cart.products.find((p) => p.id === product.id)) {
        cart.products.push({ id: product.id, quantity: 1 });
      } else {
        cart.products.find((p) => p.id === product.id).quantity++;
      }
      const updatedCart = await Contenedor.updateById(cid, cart);
      res.json(updatedCart);
    }
  }
});
module.exports = router;