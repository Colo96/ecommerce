const { Router } = require("express");
const SessionController = require("../../controllers/sessions.controller");
const passportCustom = require("../../middleware/passport.middleware");

const router = Router();

router.post("/register", SessionController.register);
router.post("/login", SessionController.login);
router.get("/current", passportCustom("jwt"), SessionController.currentSession);
router.get("/logout", SessionController.logout);

module.exports = router;
