'use strict';
module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    name: {
        allowNull: false,
        type: DataTypes.STRING(50),
    },
    pinned: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    ownerId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    isTrashBin: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    isRoot: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    previousParentId: {
        type: DataTypes.INTEGER
    },
  }, {});
  Folder.associate = function(models) {
    Folder.hasMany(models.ParentFolder, {
        as: "parent",
        foreignKey: "parentId",
        onDelete: "CASCADE",
        hooks: true,
    });

    Folder.hasOne(models.ParentFolder, {
        as: "child",
        foreignKey: "childId"
    });

    Folder.hasMany(models.File, {
        foreignKey: "folderId",
        onDelete: "CASCADE",
        hooks: true,
    });

    Folder.hasMany(models.SharedFolder, {
        foreignKey: "folderId",
        onDelete: "CASCADE",
        hooks: true,
    });

    Folder.belongsTo(models.User, {
        foreignKey: "ownerId"
    });
  };
  return Folder;
};
