const getDAOS = require("../models/daos/index.dao");
const { HTTP_STATUS, HttpError, hashPassword } = require("../utils/api.utils");
const { generateUserErrorInfo } = require("./errors/info.error");

const { usersDAO } = getDAOS();

class UsersService {
  async generateUsers() {
    const users = await usersDAO.generateUsers();
    return users;
  }

  async getUserByEmail(email) {
    if (!email) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const user = await usersDAO.getUserByEmail(email);
    if (!user) {
      throw new HttpError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }

  async createUser(payload) {
    const { first_name, last_name, age, email, password, role } = payload;
    if (!first_name || !last_name || !age || !email || !password) {
      throw new HttpError("Missing fields", HTTP_STATUS.BAD_REQUEST);
    }
    if (
      typeof first_name !== "string" ||
      typeof last_name !== "string" ||
      typeof age !== "number" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      throw new HttpError(
        generateUserErrorInfo(payload),
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const newUserPayload = {
      first_name,
      last_name,
      age,
      email,
      password: hashPassword(password),
      role,
    };
    const newUser = await usersDAO.createUser(newUserPayload);
    return newUser;
  }
}

module.exports = UsersService;
