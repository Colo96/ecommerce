const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/src/public/index.html");
});

router.get("/productView", (req, res) => {
  res.sendFile(process.cwd() + "/src/public/product.html");
});

router.get("/login", (req, res) => {
  res.sendFile(process.cwd() + "/src/public/login.html");
});

router.get("/register", (req, res) => {
  res.sendFile(process.cwd() + "/src/public/register.html");
});

module.exports = router;
