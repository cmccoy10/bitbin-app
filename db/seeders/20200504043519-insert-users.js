'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ firstName: 'Demo', lastName: "User", email: 'demo@example.com', hashedPassword: createPassword() }),
      r({ firstName: 'Yusuke', lastName: "Hiruke", email: 'yusuke@example.com', hashedPassword: createPassword() }),
      r({ firstName: 'Peta', lastName: "Sandra", email: 'petra@example.com', hashedPassword: createPassword() }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
