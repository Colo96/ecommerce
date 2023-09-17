const BusinessesService = require("./businesses.service");
const MailingService = require("./mailing.service");
const ProductsService = require("./products.service");
const UsersService = require("./users.service");

const productsService = new ProductsService();
const businessesService = new BusinessesService();
const usersService = new UsersService();
const mailingService = new MailingService();

const getSERVICES = () => {
  return {
    productsService,
    businessesService,
    usersService,
    mailingService,
  };
};

module.exports = getSERVICES;
