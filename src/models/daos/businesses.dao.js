const { generateDefaultBusinesses } = require("../../utils/mock.utils");
const BusinessesModel = require("../schemas/businesses.schema");

class BusinessesDAO {
  async generateBusinesses() {
    const businesses = generateDefaultBusinesses();
    const generatedBusinesses = await BusinessesModel.create(businesses);
    return generatedBusinesses;
  }
  async getBusinesses() {
    const businesses = await BusinessesModel.find().lean();
    return businesses;
  }
  async getBusinessById(id) {
    const business = await BusinessesModel.findOne({ _id: id }).lean();
    return business;
  }
  async addProductToBusiness(id, product) {
    const addedProductToBusiness = await BusinessesModel.updateOne(
      { _id: id },
      { $push: { products: product } }
    );
    return addedProductToBusiness;
  }
}

module.exports = BusinessesDAO;
