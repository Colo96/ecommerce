const BusinessesDAO = require("./businesses.dao");
const ProductsDAO = require("./products.dao");
const UsersDAO = require("./users.dao");

const productsDAO = new ProductsDAO();
const businessesDAO = new BusinessesDAO();
const usersDAO = new UsersDAO();

const getDAOS = () => {
  return {
    productsDAO,
    businessesDAO,
    usersDAO,
  };
};

module.exports = getDAOS;
