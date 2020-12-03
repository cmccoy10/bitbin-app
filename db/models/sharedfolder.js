'use strict';
module.exports = (sequelize, DataTypes) => {
  const SharedFolder = sequelize.define('SharedFolder', {
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    folderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    }
  }, {});
  SharedFolder.associate = function(models) {
    SharedFolder.belongsTo(models.User, {
        foreignKey: "userId"
    });

    SharedFolder.belongsTo(models.Folder, {
        foreignKey: "folderId"
    });
  };
  return SharedFolder;
};
