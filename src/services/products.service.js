const getDAOS = require("../models/daos/index.dao");
const { HTTP_STATUS, HttpError } = require("../utils/api.utils");
const { generateProductErrorInfo } = require("./errors/info.error");

const { productsDAO } = getDAOS();

class ProductsService {
  async generateProducts() {
    const products = await productsDAO.generateProducts();
    return products;
  }
  async getProducts() {
    const products = await productsDAO.getProducts();
    return products;
  }
  async getProductById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const product = await productsDAO.getProductById(id);
    if (!product) {
      throw new HttpError("Product not found", HTTP_STATUS.NOT_FOUND);
    }
    return product;
  }
}

module.exports = ProductsService;
