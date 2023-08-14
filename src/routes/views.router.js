const express = require("express");
const router = express.Router();

const products = require("../data/products.json");

router.get("/", (req, res) => {
  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts");
});

module.exports = router;