'use strict';
module.exports = (sequelize, DataTypes) => {
  const DeletedItem = sequelize.define('DeletedItem', {
    userId: DataTypes.INTEGER,
    fileId: DataTypes.INTEGER,
    folderId: DataTypes.INTEGER
  }, {});
  DeletedItem.associate = function(models) {
    DeletedItem.belongsTo(models.User, {
        foreignKey: "userId"
    });

    DeletedItem.belongsTo(models.File, {
        foreignKey: "fileId"
    });

    DeletedItem.belongsTo(models.Folder, {
        foreignKey: "folderId"
    });
  };
  return DeletedItem;
};
