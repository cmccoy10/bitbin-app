'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Files', [
        { fileName: 'test.png', itemUrl: "www.test.png", folderId: 1, pinned: false, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Files', null, {});
  }
};
