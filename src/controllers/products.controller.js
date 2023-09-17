const getSERVICES = require("../services/index.service");
const { HTTP_STATUS } = require("../utils/api.utils");

const { productsService } = getSERVICES();

class ProductsController {
  static async generateProducts(req, res, next) {
    try {
      const products = await productsService.generateProducts();
      const response = {
        success: true,
        products,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getProducts(req, res, next) {
    try {
      const products = await productsService.getProducts();
      const response = {
        success: true,
        products,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getProductById(req, res, next) {
    const { pid } = req.params;
    try {
      const product = await productsService.getProductById(pid);
      const response = {
        success: true,
        product,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductsController;
