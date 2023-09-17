const { Router } = require("express");
const ProductsController = require("../../controllers/products.controller");

const router = Router();

router.post("/generateproducts", ProductsController.generateProducts);
router.get("/", ProductsController.getProducts);
router.get("/:pid", ProductsController.getProductById);

module.exports = router;
