const getSERVICES = require("../services/index.service");
const { HTTP_STATUS } = require("../utils/api.utils");

const { businessesService } = getSERVICES();

class BusinessesController {
  static async generateBusinesses(req, res, next) {
    try {
      const businesses = await businessesService.generateBusinesses();
      const response = {
        success: true,
        businesses,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getBusinesses(req, res, next) {
    try {
      const businesses = await businessesService.getBusinesses();
      const response = {
        success: true,
        businesses,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getBusinessById(req, res, next) {
    const { bid } = req.params;
    try {
      const business = await businessesService.getBusinessById(bid);
      const response = {
        success: true,
        business,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async addProductToBusiness(req, res, next) {
    const { bid } = req.params;
    const product = req.body;
    try {
      const addedProductToBusiness =
        await businessesService.addProductToBusiness(bid, product);
      const response = {
        success: true,
        addedProductToBusiness,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BusinessesController;
