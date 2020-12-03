'use strict';
module.exports = (sequelize, DataTypes) => {
  const ParentFolder = sequelize.define('ParentFolder', {
    parentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    childId: {
        type: DataTypes.INTEGER
    }
  }, {});
  ParentFolder.associate = function(models) {
    ParentFolder.belongsTo(models.Folder, {
        as: "parent",
        foreignKey: "parentId"
    });

    ParentFolder.belongsTo(models.Folder, {
        as: "child",
        foreignKey: "childId"
    });
  };
  return ParentFolder;
};
