const { Router } = require("express");
const productsRouter = require("./products/products.router");
const businessesRouter = require("./businesses/businesses.router");
const usersRouter = require("./users/users.router");
const viewsRouter = require("./views/views.router");
const sessionsRouter = require("./sessions/sessions.router");
const swaggerJSDoc = require("swagger-jsdoc");
const { serve, setup } = require("swagger-ui-express");

const router = Router();

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce API",
      description: "Ecommerce API",
      version: "1.0.0",
      contact: {
        name: "Axel Langerman",
        email: "axellangerman@yahoo.com",
      },
    },
  },
  apis: [`${process.cwd()}/src/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

router.use("/", viewsRouter);
router.use("/doc", serve, setup(specs));
router.use("/products", productsRouter);
router.use("/businesses", businessesRouter);
router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);

module.exports = router;
