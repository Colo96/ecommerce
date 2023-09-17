const { generateDefaultUsers } = require("../../utils/mock.utils");
const UsersModel = require("../schemas/users.schema");

class UsersDAO {
  async generateUsers() {
    const users = generateDefaultUsers();
    const generatedUsers = await UsersModel.create(users);
    return generatedUsers;
  }
  async getUserByEmail(email) {
    const user = await UsersModel.findOne({ email: email }).lean();
    return user;
  }

  async createUser(payload) {
    const newUser = await UsersModel.create(payload);
    return newUser;
  }
}

module.exports = UsersDAO;
