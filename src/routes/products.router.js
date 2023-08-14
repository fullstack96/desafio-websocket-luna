const express = require("express");
const router = express.Router();
const Contenedor = require("../productManager");
router.use(express.json());

router.get("/products", async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const products = await Contenedor.getAll();
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (err) {
    res.status(404).send("Product not found");
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await Contenedor.getById(id);

    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(404).send("Product not found");
  }
});

router.post("/products", async (req, res) => {
  try {
    const newProduct = req.body;
    const addProduct = await Contenedor.addFile(newProduct);
    res.json(addProduct);
  } catch (err) {
    res.status(404).send("Product not found");
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await Contenedor.getById(id);

    if (!product) {
      res.status(404).send("Product not found");
    } else {
      const updatedProduct = await Contenedor.updateById(id, req.body);
      res.json(updatedProduct);
    }
  } catch (err) {
    res.status(404).send("Product not found");
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await Contenedor.getById(id);

    if (!product) {
      res.status(404).send("Product not found");
    } else {
      const updatedProducts = await Contenedor.deleteById(id);
      res.json(updatedProducts);
    }
  } catch (err) {
    res.status(404).send("Product not found");
  }
});

module.exports = router;