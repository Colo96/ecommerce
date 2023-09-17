const { Router } = require("express");
const BusinessesController = require("../../controllers/businesses.controller");

const router = Router();

router.post("/generatebusinesses", BusinessesController.generateBusinesses);
router.get("/", BusinessesController.getBusinesses);
router.get("/:bid", BusinessesController.getBusinessById);
router.post("/:bid/products", BusinessesController.addProductToBusiness);

module.exports = router;
