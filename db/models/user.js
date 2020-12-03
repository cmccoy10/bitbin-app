'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
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
        foreignKey: "ownerId"
    })


    User.hasMany(models.SharedFolder, {
        foreignKey: "userId"
    })

    User.hasMany(models.DeletedItem, {
        foreignKey: "userId"
    })
  }
  return User;
};
