'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Folders', [
          { name: "Star Wars Stuff", pinned: false, ownerId: 1, createdAt: new Date(), updatedAt: new Date() },
          { name: "Ice Cream", pinned: false, ownerId: 2, createdAt: new Date(), updatedAt: new Date() },
          { name: "Beans", pinned: false, ownerId: 1, createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Folders', null, {});
  }
};
