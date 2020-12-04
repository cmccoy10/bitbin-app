'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('SharedFolders', [
        { userId: 1, folderId: 1, createdAt: new Date(), updatedAt: new Date() },
        { userId: 1, folderId: 2, createdAt: new Date(), updatedAt: new Date() },
        { userId: 2, folderId: 3, createdAt: new Date(), updatedAt: new Date() },
        { userId: 2, folderId: 4, createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('SharedFolders', null, {});
  }
};
