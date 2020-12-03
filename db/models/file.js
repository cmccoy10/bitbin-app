'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    fileName: DataTypes.STRING,
    itemUrl: DataTypes.STRING,
    folderId: DataTypes.INTEGER,
    pinned: DataTypes.BOOLEAN
  }, {});
  File.associate = function(models) {
    File.belongsTo(models.Folder, {
        foreignKey: "folderId"
    });

    File.hasMany(models.DeletedItem, {
        foreignKey: "fileId"
    });
  };
  return File;
};
