const ProductsModel = require("../schemas/products.schema");
const { generateDefaultProducts } = require("../../utils/mock.utils");

class ProductsDAO {
  async generateProducts() {
    const products = generateDefaultProducts();
    const generatedProducts = await ProductsModel.create(products);
    return generatedProducts;
  }
  async getProducts() {
    const products = await ProductsModel.find().lean();
    return products;
  }
  async getProductById(id) {
    const product = await ProductsModel.findOne({ _id: id }).lean();
    return product;
  }
}

module.exports = ProductsDAO;
