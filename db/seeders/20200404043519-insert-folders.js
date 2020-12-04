'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Folders', [
          { name: "root", pinned: false, ownerId: 1, isTrashBin: false, isRoot: true, createdAt: new Date(), updatedAt: new Date() },
          { name: "trashBin", pinned: false, ownerId: 1, isTrashBin: true, isRoot: false, createdAt: new Date(), updatedAt: new Date() },
          { name: "root", pinned: false, ownerId: 2, isTrashBin: false, isRoot: true, createdAt: new Date(), updatedAt: new Date() },
          { name: "trashBin", pinned: false, ownerId: 2, isTrashBin: true, isRoot: false, createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Folders', null, {});
  }
};
