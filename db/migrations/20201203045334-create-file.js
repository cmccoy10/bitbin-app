'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fileName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      itemUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      key: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mimetype: {
        allowNull: false,
        type: Sequelize.STRING
      },
      folderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Folders" }
      },
      pinned: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      previousFolderId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Files');
  }
};
