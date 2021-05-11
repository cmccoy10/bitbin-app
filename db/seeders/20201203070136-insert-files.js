'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Files', [
        { fileName: 'test1.png', itemUrl: "www.test1.png", key: "123", mimetype: "/png", folderId: 1, pinned: false, previousFolderId: 1, createdAt: new Date(), updatedAt: new Date() },
        { fileName: 'test2.png', itemUrl: "www.test2.png", key: "234", mimetype: "/png", folderId: 2, pinned: false, previousFolderId: 2, createdAt: new Date(), updatedAt: new Date() },
        { fileName: 'test3.png', itemUrl: "www.test3.png", key: "345", mimetype: "/png", folderId: 3, pinned: false, previousFolderId: 3, createdAt: new Date(), updatedAt: new Date() },
        { fileName: 'test4.png', itemUrl: "www.test4.png", key: "456", mimetype: "/png", folderId: 4, pinned: false, previousFolderId: 4, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Files', null, {});
  }
};
