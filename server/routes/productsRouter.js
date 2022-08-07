const express = require("express");
const router = express.Router();
const { Auth, isAdmin } = require("../util/Auth");
const {
  POST_Products,
  GET_product,
  Delete_Products,
} = require("../controllers/ProductsController");
router.post("/products", [Auth, isAdmin], POST_Products);
router.delete("/products", [Auth, isAdmin], Delete_Products);
router.get("/products", [Auth], GET_product);
module.exports = router;
