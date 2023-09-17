const SaveUserDTO = require("../models/dtos/users.dto");
const getSERVICES = require("../services/index.service");
const { HTTP_STATUS } = require("../utils/api.utils");

const { usersService } = getSERVICES();

class UsersController {
  static async generateUsers(req, res, next) {
    try {
      const users = await usersService.generateUsers();
      const response = {
        success: true,
        users,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    const payload = req.body;
    try {
      const userPayload = new SaveUserDTO(payload);
      const newUser = await usersService.createUser(userPayload);
      const response = {
        success: true,
        newUser,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;
