'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Files', [
        { fileName: 'test1.png', itemUrl: "www.test1.png", folderId: 1, pinned: false, createdAt: new Date(), updatedAt: new Date() },
        { fileName: 'test2.png', itemUrl: "www.test2.png", folderId: 2, pinned: false, createdAt: new Date(), updatedAt: new Date() },
        { fileName: 'test3.png', itemUrl: "www.test3.png", folderId: 3, pinned: false, createdAt: new Date(), updatedAt: new Date() },
        { fileName: 'test4.png', itemUrl: "www.test4.png", folderId: 4, pinned: false, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Files', null, {});
  }
};
