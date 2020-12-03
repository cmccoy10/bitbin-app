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
      folderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Folders" }
      },
      pinned: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('files');
  }
};
