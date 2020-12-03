'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Folders', [
          { name: "Star Wars Stuff", pinned: false, ownerId: 1 },
          { name: "Ice Cream", pinned: false, ownerId: 2 },
          { name: "Beans", pinned: false, ownerId: 1 },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Folders', null, {});
  }
};
