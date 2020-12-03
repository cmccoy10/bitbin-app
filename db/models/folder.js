'use strict';
module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    name: DataTypes.STRING,
    pinned: DataTypes.BOOLEAN,
    ownerId: DataTypes.INTEGER
  }, {});
  Folder.associate = function(models) {
    Folder.hasMany(models.ParentFolder, {
        as: "parent",
        foreignKey: "parentId"
    });

    Folder.hasOne(models.ParentFolder, {
        as: "child",
        foreignKey: "childId"
    });

    Folder.hasMany(models.File, {
        foreignKey: "folderId"
    });

    Folder.hasMany(models.SharedFolder, {
        foreignKey: "folderId"
    });

    Folder.hasMany(models.DeletedItem, {
        foreignKey: "folderId"
    });

    Folder.belongsTo(models.User, {
        foreignKey: "ownerId"
    });
  };
  return Folder;
};
