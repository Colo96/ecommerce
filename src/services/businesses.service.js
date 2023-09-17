const getDAOS = require("../models/daos/index.dao");
const { HTTP_STATUS, HttpError } = require("../utils/api.utils");
const { generateBusinessErrorInfo } = require("./errors/info.error");

const { businessesDAO, productsDAO } = getDAOS();

class BusinessesService {
  async generateBusinesses() {
    const businesses = await businessesDAO.generateBusinesses();
    return businesses;
  }
  async getBusinesses() {
    const businesses = await businessesDAO.getBusinesses();
    return businesses;
  }
  async getBusinessById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const business = await businessesDAO.getBusinessById(id);
    if (!business) {
      throw new HttpError("Business not found", HTTP_STATUS.NOT_FOUND);
    }
    return business;
  }

  async addProductToBusiness(businessId, product) {
    if (!businessId || !product) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }

    const productDB = await productsDAO.getProductById(product._id);
    if (!productDB) {
      throw new HttpError("Product not found", HTTP_STATUS.NOT_FOUND);
    }

    const businessDB = await businessesDAO.getBusinessById(businessId);
    if (!businessDB) {
      throw new HttpError("Business not found", HTTP_STATUS.NOT_FOUND);
    }

    if (businessDB.name != productDB.business) {
      throw new HttpError("Business mismatch", HTTP_STATUS.NOT_FOUND);
    }

    businessDB.products.map((productInBusiness) => {
      if (productInBusiness._id == product._id) {
        throw new HttpError(
          "The product already exists",
          HTTP_STATUS.BAD_REQUEST
        );
      }
    });

    const response = await businessesDAO.addProductToBusiness(
      businessId,
      product
    );
    return response;
  }
}

module.exports = BusinessesService;
