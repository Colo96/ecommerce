const { Router } = require("express");
const UsersController = require("../../controllers/users.controller");

const router = Router();

router.post("/generateusers", UsersController.generateUsers);
router.post("/", UsersController.createUser);

module.exports = router;
