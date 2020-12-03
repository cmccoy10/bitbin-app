'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
        queryInterface.addColumn('Users', 'deletedFolderId', {
            type: Sequelize.INTEGER
        }),
        queryInterface.addColumn('Users', 'personalFolderId', {
            type: Sequelize.INTEGER
        })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
        queryInterface.removeColumn('Users', 'deletedFolderId'),
        queryInterface.removeColumn('Users', 'personalFolderId')
    ];
  }
};
