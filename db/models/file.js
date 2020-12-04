'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    fileName: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    itemUrl: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    folderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    pinned: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    previousFolderId: {
        type: DataTypes.INTEGER
    }
  }, {});
  File.associate = function(models) {
    File.belongsTo(models.Folder, {
        foreignKey: "folderId"
    });
  };
  return File;
};
