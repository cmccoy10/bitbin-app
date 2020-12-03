'use strict';
module.exports = (sequelize, DataTypes) => {
  const DeletedItem = sequelize.define('DeletedItem', {
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    fileId: {
        type: DataTypes.INTEGER,
    },
    folderId: {
        type: DataTypes.INTEGER
    }
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
