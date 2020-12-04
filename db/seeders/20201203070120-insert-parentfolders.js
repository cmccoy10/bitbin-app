'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ParentFolders', [
        { parentId: 1, createdAt: new Date(), updatedAt: new Date() },
        { parentId: 2, createdAt: new Date(), updatedAt: new Date() },
        { parentId: 3, createdAt: new Date(), updatedAt: new Date() },
        { parentId: 4, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ParentFolders', null, {});
  }
};
