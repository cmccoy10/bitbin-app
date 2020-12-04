'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        isEmail: true,
        len: [3, 255],
      }
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validates: {
        len: [60, 60],
      },
    },
    avatarUrl: {
      type: DataTypes.STRING
    },
    tokenId: {
      type: DataTypes.STRING
    }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Folder, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
        hooks: true,
    })

    User.hasMany(models.SharedFolder, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
    })
  }
  return User;
};
